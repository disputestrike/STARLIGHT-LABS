// scripts/restore-database.sh
#!/bin/bash
# Database Restore Script
# Usage: ./scripts/restore-database.sh backup-2024-03-21-10-00-00.sql.gz
# WARNING: This will overwrite the current database!

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check arguments
if [ $# -lt 1 ]; then
  echo -e "${RED}Usage: $0 <backup-file>${NC}"
  echo "Example: $0 backup-2024-03-21-10-00-00.sql.gz"
  exit 1
fi

BACKUP_FILE="$1"
BACKUP_DIR="./.backups"
DATABASE_URL="${DATABASE_URL}"
LOG_FILE="$BACKUP_DIR/restore.log"

mkdir -p "$BACKUP_DIR"

log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

error_exit() {
  echo -e "${RED}[ERROR] $1${NC}" | tee -a "$LOG_FILE"
  exit 1
}

success() {
  echo -e "${GREEN}[SUCCESS] $1${NC}" | tee -a "$LOG_FILE"
}

warning() {
  echo -e "${YELLOW}[WARNING] $1${NC}" | tee -a "$LOG_FILE"
}

# Resolve full path
if [[ ! "$BACKUP_FILE" = /* ]]; then
  BACKUP_FILE="$BACKUP_DIR/$BACKUP_FILE"
fi

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
  error_exit "Backup file not found: $BACKUP_FILE"
fi

# Verify it's a valid backup
if ! gzip -t "$BACKUP_FILE" 2>/dev/null; then
  error_exit "Backup file is corrupted or invalid"
fi

log "Starting database restore from: $BACKUP_FILE"

# Confirmation prompt
echo -e "${YELLOW}WARNING: This will overwrite the current database!${NC}"
read -p "Type 'YES' to confirm: " confirmation

if [ "$confirmation" != "YES" ]; then
  warning "Restore cancelled"
  exit 0
fi

# Create backup of current state before restore (safety measure)
log "Creating safety backup of current database..."
SAFETY_BACKUP="$BACKUP_DIR/safety-backup-$(date +'%Y-%m-%d-%H-%M-%S').sql.gz"
if pg_dump "$DATABASE_URL" | gzip > "$SAFETY_BACKUP"; then
  success "Safety backup created: $SAFETY_BACKUP"
else
  error_exit "Failed to create safety backup"
fi

# Perform restore
log "Starting restore process..."
if gzip -dc "$BACKUP_FILE" | psql "$DATABASE_URL" > /dev/null 2>&1; then
  success "Database restore completed successfully"
else
  error_exit "Database restore failed - safety backup available at: $SAFETY_BACKUP"
fi

# Verify restore
log "Verifying restore..."
TABLE_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'")
success "Restore verified - $TABLE_COUNT tables found"

log "Restore process completed"
