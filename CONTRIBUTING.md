// CONTRIBUTING.md
# Contributing to Starlight Labs

Thank you for your interest in contributing to Starlight Labs! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct.

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- PostgreSQL 15+
- Git

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/disputestrike/STARLIGHT-LABS.git
cd STARLIGHT-LABS

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Setup database with Docker
docker-compose up -d

# Run migrations and seed
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to verify setup.

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `perf/` - Performance improvements

### 2. Make Changes

- Follow the existing code style
- Write descriptive commit messages
- Keep commits atomic and logical
- Add tests for new features

### 3. Testing

```bash
# Run all tests
npm run test:ci

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting)
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Adding/updating tests
- `chore:` - Build, dependencies, etc.

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a pull request on GitHub with:
- Clear title and description
- Link to related issues
- Screenshots for UI changes
- Test coverage information

## Code Style Guide

### TypeScript
- Use strict mode (`tsconfig.json`)
- Always add type annotations
- Avoid `any` type unless absolutely necessary

### React Components
- Use functional components with hooks
- Place hooks at the top of the component
- Use descriptive prop names
- Add JSDoc comments for complex components

### API Routes
- Use Zod for validation
- Return appropriate HTTP status codes
- Include error handling
- Document with comments

### CSS
- Use Tailwind CSS utility classes
- Avoid inline styles
- Group related utilities
- Follow mobile-first approach

## Testing

### Unit Tests

```typescript
// Example: components/ui/Card.test.tsx
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  it('renders with title and description', () => {
    render(<Card title="Test" description="Desc" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Integration Tests

Test complete features involving multiple components or API calls.

### E2E Tests (with Playwright)

```bash
npx playwright install
npx playwright test
```

## Database

### Creating Migrations

```bash
npx prisma migrate dev --name add_new_table
```

### Seeding Data

Update `prisma/seed.ts` and run:

```bash
npm run db:seed
```

## Performance

- Use React.memo for expensive components
- Implement proper error boundaries
- Optimize images and assets
- Monitor bundle size
- Use dynamic imports for large components

## Documentation

- Add comments to complex logic
- Update README for major changes
- Add JSDoc for functions/components
- Include examples for new features

## Pull Request Process

1. Update CHANGELOG.md
2. Update documentation
3. Ensure tests pass
4. Request review from maintainers
5. Address feedback
6. Squash commits before merge (if requested)

## Issue Reporting

When reporting issues, include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable
- Environment details
- Error logs/stack traces

## Questions?

- Check existing issues and discussions
- Ask in pull request comments
- Open a discussion on GitHub
- Email support@starlabs.dev

## License

By contributing, you agree that your contributions will be licensed under the project's license.

Thank you for contributing to Starlight Labs! 🚀
