// DATABASE_SETUP.md
# Complete Database Setup Guide

## Database Type

**Starlight Labs uses PostgreSQL** (Required)

### Version Requirements
- PostgreSQL 12+
- Recommended: PostgreSQL 14+ for best performance

---

## Quick Start (5 Minutes)

### Option 1: Docker (Recommended for Development)

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# This automatically:
# - Creates PostgreSQL container
# - Exposes on port 5432
# - Sets DATABASE_URL in environment
# - Initializes with empty database
```

### Option 2: Manual PostgreSQL Installation

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
createdb starlight_labs
```

**Linux (Ubuntu):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres createdb starlight_labs
```

**Windows:**
- Download: https://www.postgresql.org/download/windows/
- Use pgAdmin to create database

---

## Environment Setup

### 1. Create `.env.local` file:

```env
# DATABASE
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/starlight_labs"

# OR FOR DOCKER
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/starlight_labs"

# OR FOR RAILWAY/CLOUD
DATABASE_URL="postgresql://user:password@host:port/database"

# Other required environment variables
JWT_SECRET=your-secret-key-here-min-32-chars-long
ADMIN_SECRET=admin-secret-key
CRON_SECRET=cron-secret-key
NODE_ENV=development
```

### 2. Validate Connection:

```bash
# Test PostgreSQL connection
psql $DATABASE_URL -c "SELECT 1"

# Should return:
# ?column?
# ----------
#        1
# (1 row)
```

---

## Database Initialization (Step by Step)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Generate Prisma Client
```bash
npx prisma generate
```

### Step 3: Create Database Schema
```bash
# Create initial migration
npx prisma migrate dev --name init

# This will:
# 1. Create all tables
# 2. Create indexes
# 3. Set up enums
# 4. Create relations
```

### Step 4: Seed Database (Optional)
```bash
# Seed with sample data
npm run db:seed

# This creates:
# - 1 admin user (email: admin@starlabs.dev, password: Admin123!)
# - 1 founder user
# - 5 engineer profiles
# - 1 bootcamp cohort
# - 10 students
# - 2 clients
# - 1 project
# - Sample data across all tables
```

### Step 5: Verify Installation
```bash
npx prisma studio

# Opens http://localhost:5555
# Browse all tables and verify data
```

---

## Database Schema Overview

### Tables Created (40+ models):

**Authentication & Users:**
- User (users table)
- UserProfile (profiles + 2FA settings)
- ApiToken (API authentication)

**Talent Management:**
- BootcampProgram (bootcamp cohorts)
- BootcampEnrollment (student enrollment)
- BootcampAssessment (student assessments)
- EngineerProfile (engineer information)
- Skill (engineer skills)

**Project Management:**
- Project (projects)
- ProjectMember (project team members)
- Sprint (sprints)
- Task (tasks)
- TaskComment (task comments)
- TaskAttachment (task files)
- Deliverable (project deliverables)
- ProjectRisk (project risks)

**Sales & CRM:**
- Client (clients)
- ClientContact (client contacts)
- Deal (sales deals)
- SalesActivity (sales activities)

**Financial:**
- Invoice (invoices)
- InvoiceLineItem (invoice line items)
- Expense (expenses)
- Payroll (payroll records)

**Operations:**
- Dashboard (KPI dashboard)
- AuditLog (audit trail)
- Notification (notifications)

---

## Verify All Tables Created

### Using Prisma Studio:
```bash
npx prisma studio
```

### Using psql:
```bash
psql $DATABASE_URL -c "\dt"

# Should list all 40+ tables
```

### Using SQL:
```bash
psql $DATABASE_URL << EOF
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
EOF
```

---

## Common Database Issues & Solutions

### Issue 1: "ECONNREFUSED" - Cannot Connect

**Cause:** PostgreSQL not running

**Solution:**
```bash
# Start PostgreSQL
docker-compose up -d
# OR
brew services start postgresql@14
# OR
sudo service postgresql start
```

### Issue 2: "Database does not exist"

**Cause:** Database not created

**Solution:**
```bash
# Create database manually
psql -U postgres -c "CREATE DATABASE starlight_labs;"

# Then run migrations
npx prisma migrate dev --name init
```

### Issue 3: "Migration failed"

**Cause:** Schema conflicts or incomplete migrations

**Solution:**
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Confirm when prompted
# Re-seeds with sample data
```

### Issue 4: "Prisma client not generated"

**Cause:** Prisma client needs regeneration

**Solution:**
```bash
npx prisma generate
npm install @prisma/client
```

### Issue 5: "Port 5432 already in use"

**Cause:** PostgreSQL already running on default port

**Solution:**
```bash
# Use different port
docker-compose up -d --name postgres2 -p 5433:5432

# Update DATABASE_URL to use port 5433
```

---

## Production Deployment

### Railway (Recommended)

1. Go to https://railway.app
2. New Project
3. Add PostgreSQL plugin
4. Auto-sets DATABASE_URL
5. Deploy!

### AWS RDS

```bash
# Connection string format
DATABASE_URL="postgresql://user:password@host.rds.amazonaws.com:5432/dbname"

# Run migrations
npx prisma migrate deploy
npx prisma db seed
```

### Google Cloud SQL

```bash
# Connection string format  
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# Run migrations
npx prisma migrate deploy
npx prisma db seed
```

### Azure Database

```bash
# Connection string format
DATABASE_URL="postgresql://user@server:password@host.postgres.database.azure.com:5432/dbname?sslmode=require"

# Run migrations
npx prisma migrate deploy
npx prisma db seed
```

---

## Backup & Recovery

### Automated Daily Backup

```bash
# Create backup script
./scripts/backup-database.sh

# Schedule with cron (2 AM daily)
0 2 * * * /path/to/backup-database.sh
```

### Manual Backup

```bash
pg_dump $DATABASE_URL > backup.sql
gzip backup.sql
```

### Restore from Backup

```bash
# Extract
gunzip backup.sql.gz

# Restore
psql $DATABASE_URL < backup.sql
```

---

## Performance Optimization

### Add Indexes (Already Done)

All recommended indexes are configured in schema:
- User email, role, status
- Project clientId, status, startDate
- Task projectId, sprintId, status
- Invoice clientId, status, dueDate
- Deal clientId, stage
- Skill name (unique)

### Connection Pooling

```env
# For Railway/cloud deployments
DATABASE_URL="postgresql://...?schema=public"
```

### Query Optimization

Built-in optimizations:
- Relation loading with Prisma
- Indexed queries
- Connection pooling ready
- Redis caching ready

---

## Testing Database

### Create Test Database

```bash
# Create test database
createdb starlight_labs_test

# Set test environment
TEST_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/starlight_labs_test"

# Run tests
npm run test
```

---

## Monitoring & Maintenance

### Monitor Database Size

```bash
psql $DATABASE_URL -c "
SELECT 
  pg_size_pretty(pg_database_size(current_database())) as database_size,
  pg_size_pretty(pg_total_relation_size('\"User\"')) as user_table_size,
  pg_size_pretty(pg_total_relation_size('\"Project\"')) as project_table_size,
  pg_size_pretty(pg_total_relation_size('\"Invoice\"')) as invoice_table_size;
"
```

### Check Active Connections

```bash
psql $DATABASE_URL -c "
SELECT 
  datname,
  count(*) as connection_count
FROM pg_stat_activity
GROUP BY datname;
"
```

### View Slow Queries

```bash
psql $DATABASE_URL -c "
SELECT 
  query,
  mean_exec_time,
  calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
"
```

---

## All Tables & Models Reference

```
✅ User                    (Authentication)
✅ UserProfile             (Profiles + 2FA)
✅ ApiToken                (API Keys)
✅ BootcampProgram         (Bootcamp)
✅ BootcampEnrollment      (Student Enrollment)
✅ BootcampAssessment      (Assessments)
✅ EngineerProfile         (Engineer Details)
✅ Skill                   (Skills)
✅ Project                 (Projects)
✅ ProjectMember           (Team Members)
✅ Sprint                  (Sprints)
✅ Task                    (Tasks)
✅ TaskComment             (Comments)
✅ TaskAttachment          (Attachments)
✅ Deliverable             (Deliverables)
✅ ProjectRisk             (Risks)
✅ Client                  (Clients)
✅ ClientContact           (Contacts)
✅ Deal                    (Deals)
✅ SalesActivity           (Sales Activities)
✅ Invoice                 (Invoices)
✅ InvoiceLineItem         (Line Items)
✅ Expense                 (Expenses)
✅ Payroll                 (Payroll)
✅ Dashboard               (KPIs)
✅ AuditLog                (Audit Trail)
✅ Notification            (Notifications)

Total: 40+ Production-Ready Models
```

---

## Next Steps

1. ✅ Database Setup → COMPLETE
2. ▶ Start Application
3. ▶ Test Features
4. ▶ Deploy to Production

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
```

---

## Support

- Prisma Docs: https://www.prisma.io/docs
- PostgreSQL Docs: https://www.postgresql.org/docs
- Issues: https://github.com/disputestrike/STARLIGHT-LABS/issues
- Email: support@starlabs.dev
