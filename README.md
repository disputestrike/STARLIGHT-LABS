// README.md
# Starlight Labs - AI-Native Global Talent & Delivery Platform

**Production-grade full-stack application for managing global engineering talent, project delivery, CRM, and financial operations.**

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- PostgreSQL database
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/disputestrike/STARLIGHT-LABS.git
cd STARLIGHT-LABS

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Setup database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📋 Environment Variables

Required environment variables in `.env.local`:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/starlabs

# Authentication
JWT_SECRET=your-secret-key-change-in-production

# API Keys (optional for features)
STRIPE_SECRET_KEY=sk_test_...
TWILIO_ACCOUNT_SID=AC...
RESEND_API_KEY=re_...
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based
- **Deployment**: Railway

### Project Structure

```
starlabs/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard
│   ├── projects/          # Project management
│   ├── talent/            # Talent pipeline
│   ├── sales/             # CRM interface
│   ├── financial/         # Financial tracking
│   ├── team/              # Team management
│   ├── profile/           # User profile
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
├── lib/                   # Utilities and helpers
├── prisma/                # Database schema and migrations
├── types/                 # TypeScript types
├── public/                # Static assets
└── package.json          # Dependencies
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Sprints
- `GET /api/projects/sprints` - List sprints
- `POST /api/projects/sprints` - Create sprint

### Tasks
- `GET /api/projects/tasks` - List tasks
- `POST /api/projects/tasks` - Create task

### Sales
- `GET /api/sales/clients` - List clients
- `POST /api/sales/clients` - Create client
- `GET /api/sales/deals` - List deals
- `POST /api/sales/deals` - Create deal

### Financial
- `GET /api/financial/invoices` - List invoices
- `GET /api/financial/expenses` - List expenses
- `GET /api/financial/payroll` - List payroll

### Admin
- `GET /api/admin/dashboard` - Get dashboard metrics

### Health
- `GET /api/health` - Health check

## 🗄️ Database Schema

Comprehensive schema covering:
- User management & authentication
- Project delivery & sprint management
- Talent pipeline & bootcamp
- Sales CRM
- Financial tracking (invoices, expenses, payroll)
- Operations & audit logging

Run migrations:
```bash
npx prisma migrate dev
```

## 🔐 Security

- JWT-based authentication
- Password hashing (bcrypt in production)
- Environment variable protection
- CORS configuration
- SQL injection prevention via Prisma ORM
- Input validation with Zod

## 🚀 Deployment

### Railway Deployment

1. **Connect GitHub**
   - Push code to GitHub
   - Connect repository to Railway

2. **Add Plugins**
   - PostgreSQL database
   - Environment variables

3. **Deploy**
   ```bash
   npm run build
   npm run start
   ```

### Docker Deployment

```bash
docker build -t starlabs .
docker run -p 3000:3000 starlabs
```

## 📊 Features

### Talent Management
- Bootcamp program management
- Student enrollment and assessment
- Engineer profile tracking
- Skills inventory
- Utilization tracking

### Project Delivery
- Project creation and management
- Sprint planning and tracking
- Task management with priorities
- QA gates and testing
- Risk management

### Sales CRM
- Client management
- Deal pipeline tracking
- Sales activity logging
- Probability-weighted forecasting
- Activity history

### Financial Operations
- Invoice generation and tracking
- Expense management
- Payroll processing
- Revenue tracking
- Margin analysis

### Operations
- Real-time KPI dashboards
- Team management
- User permissions (RBAC)
- Audit logging
- Notifications

## 🧪 Testing

```bash
# Run tests
npm run test

# Type checking
npm run type-check
```

## 📈 Monitoring

Health check endpoint:
```bash
curl http://localhost:3000/api/health
```

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open pull request

## 📄 License

Proprietary - Starlight Labs

## 📞 Support

For support, email support@starlabs.dev or open an issue on GitHub.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced reporting and BI
- [ ] AI-powered insights
- [ ] Marketplace integrations
- [ ] Blockchain-based credentials
- [ ] Video call integration
- [ ] Time tracking integration
- [ ] Expense receipt OCR

---

**Version**: 1.0.0  
**Last Updated**: March 2024  
**Status**: Production Ready
