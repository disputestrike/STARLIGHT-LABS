// BACKUP_AND_RECOVERY.md
# Backup & Disaster Recovery Guide

Complete guide to backing up and recovering Starlight Labs data.

## Quick Start

### Automated Daily Backups

```bash
# Make scripts executable
chmod +x scripts/backup-database.sh
chmod +x scripts/restore-database.sh

# Run manual backup
./scripts/backup-database.sh

# Schedule daily backup (2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /path/to/STARLIGHT-LABS/scripts/backup-database.sh") | crontab -
```

### Emergency Restore

```bash
# List available backups
ls -lh .backups/

# Restore from specific backup
./scripts/restore-database.sh backup-2024-03-21-10-00-00.sql.gz
```

---

## Backup Strategy

### 3-Tier Backup System

```
TIER 1: Local Backups (./.backups/)
├─ Daily backups (kept 30 days)
├─ Compressed with gzip
└─ Automatic cleanup of old backups

TIER 2: Cloud Storage (AWS S3)
├─ Daily uploads to S3
├─ Versioning enabled
├─ Lifecycle policy: 90 days
└─ Cross-region replication

TIER 3: Disaster Recovery (AWS RDS)
├─ Automated snapshots
├─ Multi-AZ deployment
├─ 35-day retention
└─ Cross-region copy
```

### Backup Schedule

| Frequency | Retention | Storage | Purpose |
|-----------|-----------|---------|---------|
| Daily (2 AM) | 30 days | Local + S3 | Recent recovery |
| Weekly (Sunday) | 90 days | S3 | Medium-term backup |
| Monthly (1st) | 1 year | Glacier | Long-term archival |
| On-Demand | Until manual delete | Local | Before major changes |

---

## Local Backup Management

### Manual Backup

```bash
# Create backup
./scripts/backup-database.sh

# Output: ./.backups/backup-2024-03-21-10-30-45.sql.gz
```

### View Backup Status

```bash
# List all backups
ls -lh .backups/backup-*.sql.gz

# Show backup log
tail -f .backups/backup.log

# Calculate total backup size
du -sh .backups/
```

### Verify Backup Integrity

```bash
# Check if backup is valid
gzip -t .backups/backup-2024-03-21-10-30-45.sql.gz

# Test restore on separate database
createdb test_db
gunzip -c .backups/backup-2024-03-21-10-30-45.sql.gz | psql test_db
dropdb test_db
```

---

## Cloud Backup (AWS S3)

### Setup S3 Backup

```bash
# Set environment variables
export AWS_S3_BUCKET=starlabs-backups
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
export AWS_REGION=us-east-1

# Configure S3 bucket
aws s3api create-bucket \
  --bucket starlabs-backups \
  --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket starlabs-backups \
  --versioning-configuration Status=Enabled

# Enable encryption
aws s3api put-bucket-encryption \
  --bucket starlabs-backups \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'

# Set lifecycle policy (delete after 90 days)
aws s3api put-bucket-lifecycle-configuration \
  --bucket starlabs-backups \
  --lifecycle-configuration file://lifecycle.json
```

### Lifecycle Configuration

```json
{
  "Rules": [
    {
      "Id": "DeleteOldBackups",
      "Status": "Enabled",
      "Prefix": "backups/",
      "Expiration": {
        "Days": 90
      }
    }
  ]
}
```

### Monitor S3 Backups

```bash
# List backups in S3
aws s3 ls s3://starlabs-backups/backups/ --recursive --human-readable --summarize

# Calculate total S3 backup size
aws s3 ls s3://starlabs-backups/ --recursive --summarize

# Download backup from S3
aws s3 cp s3://starlabs-backups/backups/backup-2024-03-21-10-30-45.sql.gz .
```

---

## Database Recovery Procedures

### Scenario 1: Recent Data Loss

**Time to Recover**: < 5 minutes

```bash
# List recent backups
ls -lt .backups/ | head -5

# Restore from most recent backup
./scripts/restore-database.sh backup-latest.sql.gz
```

### Scenario 2: Corruption Detected

**Time to Recover**: 5-15 minutes

```bash
# Check database health
psql $DATABASE_URL -c "SELECT COUNT(*) FROM pg_database;"

# Create safety backup
pg_dump $DATABASE_URL | gzip > safety-backup.sql.gz

# Restore from clean backup
./scripts/restore-database.sh backup-2024-03-21-10-00-00.sql.gz

# Verify recovery
npm run db:seed  # Seed necessary data if needed
```

### Scenario 3: Complete System Failure

**Time to Recover**: 30-60 minutes

```bash
# 1. Restore server/container
docker-compose up -d

# 2. Wait for PostgreSQL to start
sleep 10

# 3. Download backup from S3
aws s3 cp s3://starlabs-backups/backups/latest-backup.sql.gz .

# 4. Restore database
./scripts/restore-database.sh latest-backup.sql.gz

# 5. Restart application
npm run build
npm start

# 6. Verify system
curl http://localhost:3000/api/health
```

### Scenario 4: Ransomware/Malicious Access

**Time to Recover**: 1-2 hours

```bash
# 1. Isolate affected system (take offline)
docker-compose down
# Stop all services

# 2. Restore from clean backup (before infection)
# Use backup from BEFORE last suspicious activity date

# 3. Audit backup integrity
gzip -t backup-clean.sql.gz
# Verify checksum if available

# 4. Deploy on clean infrastructure
# Use new AWS instances/containers

# 5. Perform full system audit
# - Check for backdoors
# - Review audit logs
# - Update all credentials
# - Enable 2FA

# 6. Restore database on clean infrastructure
./scripts/restore-database.sh backup-clean.sql.gz
```

---

## Backup Testing

### Weekly Backup Test

```bash
# 1. Pick a backup at random
BACKUP=$(ls -t .backups/*.sql.gz | head -1)

# 2. Create test database
TEST_DB="test_restore_$(date +%s)"
createdb $TEST_DB

# 3. Restore to test database
gunzip -c $BACKUP | psql $TEST_DB

# 4. Run verification queries
psql $TEST_DB << EOF
  SELECT COUNT(*) as users FROM "User";
  SELECT COUNT(*) as projects FROM "Project";
  SELECT COUNT(*) as invoices FROM "Invoice";
  SELECT MAX(created_at) as latest_record FROM "Invoice";
EOF

# 5. Drop test database
dropdb $TEST_DB

echo "Backup verification passed!"
```

### Document Test Results

```bash
# Log test results
echo "$(date): Backup test completed - $BACKUP" >> .backups/test-results.log
```

---

## Monitoring & Alerts

### Health Check

```bash
# Verify backup was created today
BACKUP_DATE=$(date +%Y-%m-%d)
if ls .backups/backup-$BACKUP_DATE-*.sql.gz &>/dev/null; then
  echo "✓ Today's backup exists"
else
  echo "✗ WARNING: No backup for today!"
  exit 1
fi
```

### Slack Notification

```bash
#!/bin/bash
# Send backup status to Slack

BACKUP_DATE=$(date +%Y-%m-%d)
BACKUP_SIZE=$(du -sh .backups/ | cut -f1)

curl -X POST -H 'Content-type: application/json' \
  --data "{
    \"text\": \"Database Backup Complete\",
    \"attachments\": [{
      \"color\": \"good\",
      \"fields\": [
        {\"title\": \"Date\", \"value\": \"$BACKUP_DATE\", \"short\": true},
        {\"title\": \"Size\", \"value\": \"$BACKUP_SIZE\", \"short\": true},
        {\"title\": \"Location\", \"value\": \"S3 + Local\", \"short\": true}
      ]
    }]
  }" \
  $SLACK_WEBHOOK_URL
```

---

## Compliance & Audit

### Backup Checklist

- [ ] Daily backups created automatically
- [ ] Backups verified for integrity
- [ ] Cloud backups uploaded to S3
- [ ] Old backups cleaned up per retention policy
- [ ] Recovery tested at least weekly
- [ ] Audit logs maintained
- [ ] Staff trained on recovery procedures
- [ ] Disaster recovery plan documented

### Audit Trail

```bash
# View backup history
tail -n 100 .backups/backup.log

# Search for specific date
grep "2024-03-21" .backups/backup.log

# Count successful backups this month
grep "SUCCESS" .backups/backup.log | wc -l
```

---

## Best Practices

✅ **DO:**
- Back up daily to multiple locations
- Test restores regularly (weekly)
- Keep backups outside primary region
- Document recovery procedures
- Monitor backup logs
- Encrypt backups in transit and at rest
- Maintain clear naming conventions
- Keep detailed audit trails

❌ **DON'T:**
- Keep only one backup copy
- Skip backup integrity tests
- Store backups on same server
- Leave backups unencrypted
- Ignore backup job failures
- Skip backup verification
- Delete backups without confirmation

---

## Performance Impact

### Backup Performance

| Operation | Duration | Impact |
|-----------|----------|--------|
| Database dump | ~2-5 min | <5% CPU increase |
| Compression | ~1-2 min | <10% CPU increase |
| S3 upload | ~3-10 min | <5% network |
| **Total** | **~6-17 min** | **Minimal** |

### Recovery Performance

| Operation | Duration | Notes |
|-----------|----------|-------|
| Download from S3 | 1-5 min | Depends on size |
| Restore to DB | 3-10 min | Depends on size |
| Data verification | 1-2 min | Safety check |
| **Total** | **5-17 min** | **High priority** |

---

## Support

For backup issues:
- Check backup logs: `tail -f .backups/backup.log`
- Verify disk space: `df -h`
- Test restore procedure
- Contact: support@starlabs.dev
