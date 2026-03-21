// DEPLOYMENT_DATABASE.md
# Complete Deployment & Database Configuration Guide

## Quick Deployment Summary

| Platform | Time | Database | Setup |
|----------|------|----------|-------|
| Railway | 5 min | Auto PostgreSQL | Click & deploy |
| Docker | 10 min | Docker Compose | docker-compose up |
| AWS | 20 min | RDS PostgreSQL | Manual config |
| Vercel | 10 min | External RDS/Railway | Set env vars |
| Self-hosted | 30 min | Self-managed PostgreSQL | Full control |

---

## CRITICAL: Database Requirements

### ✅ PostgreSQL REQUIRED

Starlight Labs REQUIRES PostgreSQL. Other databases (MySQL, MongoDB, SQLite) are NOT supported.

### Minimum Requirements:
- PostgreSQL 12+
- 1GB RAM minimum
- 2GB disk space for production data
- Connection pooling for 20+ concurrent users

### Recommended for Production:
- PostgreSQL 14+ (latest stable)
- 4GB+ RAM
- 10GB+ disk space
- Redis for caching
- Automated backups

---

## Deployment Option 1: Railway (FASTEST - 5 Minutes)

### Step 1: Connect GitHub
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose `disputestrike/STARLIGHT-LABS`
6. Click "Deploy"

### Step 2: Add PostgreSQL Database
1. In Railway dashboard
2. Click "+ Add"
3. Select "Database" → "PostgreSQL"
4. Select latest version
5. Railway auto-generates DATABASE_URL
6. Click "Deploy"

### Step 3: Configure Environment Variables
1. In Railway project settings
2. Add variables:
   ```
   NODE_ENV=production
   JWT_SECRET=<generate-strong-key>
   ADMIN_SECRET=<generate-secret>
   CRON_SECRET=<generate-secret>
   ```

### Step 4: Deploy Application
1. Click "Deploy" button
2. Wait for build (2-3 minutes)
3. Get production URL from Railway
4. Visit your deployed app!

### Step 5: Initialize Database
1. In Railway terminal:
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

### Auto-Generated DATABASE_URL
Railway automatically creates: 
```
postgresql://postgres:PASSWORD@host:5432/railway
```

---

## Deployment Option 2: Docker (LOCAL + PRODUCTION)

### Local Development

```bash
# 1. Start services
docker-compose up -d

# 2. Initialize database
npm run db:init

# 3. Start development
npm run dev

# 4. Visit http://localhost:3000
```

### Production Docker Deployment

```bash
# 1. Build image
docker build -t starlight-labs:latest .

# 2. Run container with PostgreSQL
docker run -d \
  --name starlight-labs \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@postgres:5432/starlight_labs" \
  -e NODE_ENV=production \
  -e JWT_SECRET=your-secret-key \
  starlight-labs:latest

# 3. Initialize database
docker exec starlight-labs npx prisma migrate deploy
docker exec starlight-labs npm run db:seed
```

### Docker Compose for Production

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_PASSWORD: secure_password_here
      POSTGRES_DB: starlight_labs
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:secure_password_here@postgres:5432/starlight_labs
      NODE_ENV: production
      JWT_SECRET: your-secret-key
    depends_on:
      - postgres
    restart: always

volumes:
  postgres_data:
```

---

## Deployment Option 3: AWS RDS + Elastic Beanstalk

### Step 1: Create RDS PostgreSQL

```bash
# Using AWS CLI
aws rds create-db-instance \
  --db-instance-identifier starlight-labs \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 14.7 \
  --master-username postgres \
  --master-user-password YourSecurePassword123! \
  --allocated-storage 20 \
  --backup-retention-period 30
```

### Step 2: Get RDS Endpoint

```bash
aws rds describe-db-instances \
  --db-instance-identifier starlight-labs \
  --query 'DBInstances[0].Endpoint.Address'
```

### Step 3: Create Elastic Beanstalk Environment

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p node.js-18 starlight-labs

# Create environment
eb create starlight-labs-prod

# Set environment variables
eb setenv \
  DATABASE_URL="postgresql://postgres:YourPassword@starlight-labs.xxxxx.us-east-1.rds.amazonaws.com:5432/starlight_labs" \
  NODE_ENV=production \
  JWT_SECRET=your-secret-key
```

### Step 4: Deploy

```bash
# Deploy from GitHub
git push

# OR deploy manually
eb deploy
```

### Step 5: Initialize Database

```bash
eb ssh
cd /var/app/current
npx prisma migrate deploy
npm run db:seed
```

---

## Deployment Option 4: Google Cloud Run + Cloud SQL

### Step 1: Create Cloud SQL PostgreSQL

```bash
gcloud sql instances create starlight-labs \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=us-central1
```

### Step 2: Create Database

```bash
gcloud sql databases create starlight_labs \
  --instance=starlight-labs
```

### Step 3: Create Cloud Run Service

```bash
gcloud run deploy starlight-labs \
  --source . \
  --platform managed \
  --region us-central1 \
  --memory 512Mi \
  --set-env-vars DATABASE_URL="postgresql://..." \
  --allow-unauthenticated
```

---

## Deployment Option 5: Vercel + Railway Database

### Step 1: Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Step 2: Configure Database

1. Go to https://railway.app
2. Create new PostgreSQL project
3. Copy DATABASE_URL
4. Add to Vercel environment variables
5. Deploy

### Step 3: Initialize Database

```bash
vercel env pull
npx prisma migrate deploy
npm run db:seed
```

---

## Environment Variables Checklist

### Required Variables

```env
# DATABASE (Most Important!)
DATABASE_URL="postgresql://user:password@host:5432/database"

# APPLICATION
NODE_ENV=production
JWT_SECRET=min-32-characters-long-secret-key-here
ADMIN_SECRET=admin-secret-key
CRON_SECRET=cron-secret-key
```

### Optional Variables

```env
# Email
RESEND_API_KEY=your-resend-key
RESEND_FROM_EMAIL=noreply@starlabs.dev

# Payments
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLIC_KEY=pk_live_xxx

# SMS
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=G-XXXXX
```

---

## Database Migration Steps (ALL PLATFORMS)

After deployment, ALWAYS run:

```bash
# Step 1: Apply migrations
npx prisma migrate deploy

# Step 2: Seed database (optional)
npm run db:seed

# Step 3: Verify
npx prisma studio

# Step 4: Monitor
npm run monitor
```

---

## Health Check

Verify deployment is working:

```bash
# Test API health
curl https://your-deployed-app.com/api/health

# Should return:
{
  "status": "healthy",
  "timestamp": "2024-03-21T...",
  "version": "1.0.0"
}
```

---

## Scaling Database for Production

### Enable Connection Pooling

```env
# For Railway
DATABASE_URL="postgresql://...?schema=public&connection_limit=20"

# For AWS RDS
DATABASE_URL="postgresql://...?schema=public&sslmode=require&pgbouncer=true"
```

### Enable Caching

```bash
# Add Redis
docker run -d -p 6379:6379 redis:7-alpine

# Update DATABASE_URL with Redis
REDIS_URL="redis://localhost:6379"
```

### Monitor Connections

```bash
# View active connections
psql $DATABASE_URL -c "
  SELECT count(*) as active_connections
  FROM pg_stat_activity
  WHERE state = 'active';
"
```

---

## Database Backup Strategy

### Automated Backups (ALL PLATFORMS)

```bash
# Daily backups
0 2 * * * ./scripts/backup-database.sh

# Upload to S3
aws s3 cp backups/latest.sql.gz s3://my-bucket/backups/
```

### Railway Backup
- Auto-enabled with PostgreSQL plugin
- 30-day retention
- No action needed

### AWS RDS Backup
- Auto-enabled
- 35-day retention configurable
- Cross-region replication optional

### Manual Backup

```bash
# Create backup
pg_dump $DATABASE_URL | gzip > backup-$(date +%s).sql.gz

# Restore from backup
gunzip < backup-12345.sql.gz | psql $DATABASE_URL
```

---

## Post-Deployment Checklist

- [ ] Database connected and migrated
- [ ] Tables created and verified
- [ ] Sample data seeded
- [ ] Health check endpoint working
- [ ] Environment variables set
- [ ] SSL/TLS enabled
- [ ] Backup schedule configured
- [ ] Monitoring dashboards active
- [ ] 2FA tested
- [ ] API documentation accessible

---

## Troubleshooting Deployment

### Issue: "Cannot connect to database"
```bash
# Check DATABASE_URL format
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Fix: Verify credentials and network access
```

### Issue: "Migration failed"
```bash
# Check migration status
npx prisma migrate status

# Reset (WARNING: deletes data)
npx prisma migrate reset

# Redeploy migrations
npx prisma migrate deploy
```

### Issue: "Out of memory"
```bash
# Increase container memory
# Railway: Edit plan
# Docker: Add --memory 2g flag
# AWS: Increase instance class
```

### Issue: "Database locked"
```bash
# Kill idle connections
psql $DATABASE_URL -c "
  SELECT pg_terminate_backend(pg_stat_activity.pid)
  FROM pg_stat_activity
  WHERE pg_stat_activity.datname = 'starlight_labs'
  AND pid <> pg_backend_pid();
"
```

---

## Production Best Practices

1. ✅ **Use PostgreSQL 14+** (Latest stable)
2. ✅ **Enable SSL/TLS** (Required for security)
3. ✅ **Configure backups** (Daily minimum)
4. ✅ **Setup monitoring** (CPU, disk, connections)
5. ✅ **Use connection pooling** (PgBouncer)
6. ✅ **Enable audit logging** (For compliance)
7. ✅ **Configure alerts** (For downtime)
8. ✅ **Regular testing** (Backup restoration)
9. ✅ **Version management** (PostgreSQL updates)
10. ✅ **Security hardening** (Firewall rules)

---

## Support

- Railway Support: https://railway.app/support
- AWS RDS Docs: https://docs.aws.amazon.com/rds
- PostgreSQL Docs: https://www.postgresql.org/docs
- Prisma Docs: https://www.prisma.io/docs
- GitHub Issues: https://github.com/disputestrike/STARLIGHT-LABS/issues
- Email: support@starlabs.dev
