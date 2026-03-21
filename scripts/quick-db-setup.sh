#!/bin/bash
# scripts/quick-db-setup.sh
# Quick database setup for local development (1 minute)

set -e

echo "🚀 Starlight Labs - Quick Database Setup"
echo "=========================================="
echo

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if docker-compose exists
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Desktop"
    exit 1
fi

echo "✓ Docker and Docker Compose found"
echo

# Start PostgreSQL
echo "📦 Starting PostgreSQL container..."
docker-compose up -d postgres
echo "✓ PostgreSQL started on localhost:5432"
echo

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
for i in {1..30}; do
    if docker-compose exec -T postgres psql -U postgres -c "SELECT 1" >/dev/null 2>&1; then
        echo "✓ PostgreSQL is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ PostgreSQL failed to start"
        exit 1
    fi
    sleep 1
done
echo

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate
echo "✓ Prisma Client generated"
echo

# Run migrations
echo "🗄️  Creating database tables..."
npx prisma migrate dev --name init --skip-generate 2>/dev/null || npx prisma migrate deploy
echo "✓ Database tables created"
echo

# Optional seed
read -p "Seed database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📝 Seeding database..."
    npm run db:seed
    echo "✓ Database seeded"
    echo
    echo "Test Credentials:"
    echo "  Email: admin@starlabs.dev"
    echo "  Password: Admin123!"
fi
echo

echo "✅ Database setup complete!"
echo
echo "Next steps:"
echo "  npm run dev       - Start development server"
echo "  npx prisma studio - Browse database"
echo
