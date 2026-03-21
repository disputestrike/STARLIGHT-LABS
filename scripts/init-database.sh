#!/bin/bash
# scripts/init-database.sh
# Complete database initialization script
# Usage: ./scripts/init-database.sh

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Helper functions
info() {
  echo -e "${BLUE}ℹ${NC} $1"
}

success() {
  echo -e "${GREEN}✓${NC} $1"
}

error() {
  echo -e "${RED}✗${NC} $1"
}

warning() {
  echo -e "${YELLOW}⚠${NC} $1"
}

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  warning "node_modules not found. Installing dependencies..."
  npm install
fi

info "Starting database initialization..."
echo

# Step 1: Check environment variables
info "Step 1: Checking environment variables..."
if [ -z "$DATABASE_URL" ]; then
  warning "DATABASE_URL not set. Using default: postgresql://postgres:postgres@localhost:5432/starlight_labs"
  export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/starlight_labs"
fi
success "DATABASE_URL set"
echo

# Step 2: Test database connection
info "Step 2: Testing database connection..."
if psql "$DATABASE_URL" -c "SELECT 1" >/dev/null 2>&1; then
  success "Database connection successful"
else
  error "Cannot connect to database: $DATABASE_URL"
  echo
  warning "Make sure PostgreSQL is running. Try:"
  echo "  docker-compose up -d"
  echo "  OR"
  echo "  brew services start postgresql@14"
  exit 1
fi
echo

# Step 3: Generate Prisma Client
info "Step 3: Generating Prisma Client..."
npx prisma generate
success "Prisma Client generated"
echo

# Step 4: Check for existing migrations
info "Step 4: Checking migrations..."
if [ -d "prisma/migrations" ] && [ ! -z "$(ls -A prisma/migrations)" ]; then
  info "Existing migrations found"
  # Apply existing migrations
  info "Applying migrations..."
  npx prisma migrate deploy
  success "Migrations applied"
else
  info "No migrations found. Creating initial migration..."
  npx prisma migrate dev --name init --skip-generate
  success "Initial migration created"
fi
echo

# Step 5: Verify tables
info "Step 5: Verifying database tables..."
TABLE_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'")

if [ "$TABLE_COUNT" -gt 0 ]; then
  success "Database has $TABLE_COUNT tables"
  
  # List key tables
  info "Key tables created:"
  psql "$DATABASE_URL" -t -c "
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name
  " | head -20
else
  error "No tables found in database"
  exit 1
fi
echo

# Step 6: Seed database (optional)
info "Step 6: Database seeding..."
read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  info "Seeding database..."
  npm run db:seed
  success "Database seeded with sample data"
else
  info "Skipping database seed"
fi
echo

# Step 7: Generate database stats
info "Step 7: Database statistics..."
psql "$DATABASE_URL" -c "
  SELECT 
    'Database Size' as metric,
    pg_size_pretty(pg_database_size(current_database())) as value
  UNION ALL
  SELECT 
    'Total Tables',
    (SELECT COUNT(*)::text FROM information_schema.tables WHERE table_schema = 'public')
  UNION ALL
  SELECT 
    'Total Indexes',
    (SELECT COUNT(*)::text FROM information_schema.indexes WHERE table_schema = 'public')
"
echo

success "Database initialization complete!"
echo
echo "✅ Next steps:"
echo "   1. Start development server: npm run dev"
echo "   2. Visit http://localhost:3000"
echo "   3. Browse database: npx prisma studio"
echo
echo "Test Credentials (if seeded):"
echo "   Email: admin@starlabs.dev"
echo "   Password: Admin123!"
