// scripts/backup-database.sh
#!/bin/bash
# Automated Database Backup Script
# Usage: ./scripts/backup-database.sh
# Schedule with cron: 0 2 * * * /path/to/backup-database.sh

set -e

# Configuration
BACKUP_DIR="${BACKUP_DIR:-./.backups}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
DATABASE_URL="${DATABASE_URL}"
LOG_FILE="${BACKUP_DIR}/backup.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Log function
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Error handler
error_exit() {
  echo -e "${RED}[ERROR] $1${NC}" | tee -a "$LOG_FILE"
  exit 1
}

# Success message
success() {
  echo -e "${GREEN}[SUCCESS] $1${NC}" | tee -a "$LOG_FILE"
}

log "Starting database backup..."

# Extract database connection details
if [ -z "$DATABASE_URL" ]; then
  error_exit "DATABASE_URL environment variable not set"
fi

# Generate backup filename with timestamp
BACKUP_DATE=$(date +'%Y-%m-%d-%H-%M-%S')
BACKUP_FILE="$BACKUP_DIR/backup-$BACKUP_DATE.sql"

# Perform backup using pg_dump
if pg_dump "$DATABASE_URL" > "$BACKUP_FILE" 2>&1; then
  BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
  success "Database backup completed: $BACKUP_FILE ($BACKUP_SIZE)"
else
  error_exit "Database backup failed"
fi

# Compress backup
if gzip "$BACKUP_FILE"; then
  BACKUP_FILE="$BACKUP_FILE.gz"
  success "Backup compressed: $BACKUP_FILE"
else
  error_exit "Backup compression failed"
fi

# Delete old backups (retention policy)
log "Cleaning up old backups (retention: $RETENTION_DAYS days)..."
find "$BACKUP_DIR" -name "backup-*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Verify backup integrity
if gzip -t "$BACKUP_FILE" 2>/dev/null; then
  success "Backup integrity verified"
else
  error_exit "Backup integrity check failed"
fi

# Optional: Upload to cloud storage
if command -v aws &> /dev/null; then
  if [ -n "$AWS_S3_BUCKET" ]; then
    log "Uploading backup to S3..."
    if aws s3 cp "$BACKUP_FILE" "s3://$AWS_S3_BUCKET/backups/"; then
      success "Backup uploaded to S3"
    else
      log "Warning: S3 upload failed (backup exists locally)"
    fi
  fi
fi

log "Backup process completed successfully"
success "Backup size: $BACKUP_SIZE"
