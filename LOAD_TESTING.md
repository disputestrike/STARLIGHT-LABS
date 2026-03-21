// LOAD_TESTING.md
# Load Testing Guide

Comprehensive guide for performance and load testing Starlight Labs.

## Quick Start

### Option 1: Artillery (Recommended - Easiest)

```bash
# Install dependencies
npm install --save-dev artillery

# Run load test
npx artillery run artillery.yml

# Run with custom target URL
TARGET_URL=https://your-production-url npx artillery run artillery.yml

# Generate HTML report
npx artillery run artillery.yml --output results.json
npx artillery report results.json
```

### Option 2: K6 (Advanced - Most Powerful)

```bash
# Install K6
brew install k6  # macOS
# or from https://k6.io/docs/getting-started/installation

# Run load test
k6 run load-tests/k6-script.js

# Run with custom configuration
k6 run load-tests/k6-script.js -e BASE_URL=https://your-app.com
```

### Option 3: Autocannon (Quick Baseline)

```bash
# Install dependencies
npm install --save-dev autocannon

# Run load test
npx autocannon http://localhost:3000

# With custom config
AUTH_TOKEN="your_token" npx autocannon -c load-tests/autocannon-config.js http://localhost:3000
```

## Performance Benchmarks

### Target Metrics (Production)

```
API Response Times:
  - Average: < 200ms
  - P95: < 500ms
  - P99: < 1000ms

Throughput:
  - Minimum: 100 requests/second
  - Target: 500+ requests/second at peak

Error Rate:
  - Target: < 0.1%
  - Maximum acceptable: < 1%

Database:
  - Query time: < 50ms (p95)
  - Connection pool: < 80% utilization
  - Cache hit rate: > 85%

Uptime:
  - Target: 99.9%
  - Maintenance window: < 1 hour/month
```

## Load Testing Scenarios

### 1. Baseline Test

Tests normal operation at moderate load.

```bash
npx artillery run artillery.yml
# Duration: 3 minutes
# Ramp: 10 → 50 → 100 users
```

### 2. Spike Test

Tests system response to sudden traffic spike.

```bash
# Edit artillery.yml:
# phases:
#   - duration: 60
#     arrivalRate: 500  # Sudden spike
```

### 3. Soak Test

Tests system stability over extended period.

```bash
# Run K6 with extended duration:
k6 run load-tests/k6-script.js --duration 1h
```

### 4. Stress Test

Tests system breaking point.

```bash
# Continuously increase load until failure:
k6 run load-tests/k6-script.js --ramp-up 5m
```

## Interpreting Results

### Artillery Report

```
Summary Report
==============

http requests .... 10000 ok; 50 failed; 24.4 req/sec
response times ... min: 50ms, p95: 256ms, p99: 512ms, max: 2048ms
codes ........... 200: 9950, 500: 50
errors .......... 50 (500 errors)
```

**Key Metrics:**
- **req/sec**: Throughput (requests per second)
- **response times**: Latency distribution
- **codes**: HTTP status code breakdown
- **errors**: Failed requests

### K6 Report

```
✓ login status is 200 (9950 samples, 99.5%)
✓ login returns token (9950 samples, 99.5%)
✓ login response time OK (9950 samples, 99.5%)

X auth_duration (p95: 512ms, p99: 1024ms)
  Maximum threshold exceeded: 1000ms
```

### Red Flags

⚠️ **High Response Times**: P95/P99 exceeding thresholds
- Check database query performance
- Verify API optimization
- Increase cache utilization

⚠️ **High Error Rate**: > 1%
- Check application logs
- Verify rate limiting isn't too aggressive
- Check database connection pool

⚠️ **Connection Pool Issues**: > 80% utilization
- Increase pool size
- Optimize connection usage
- Implement connection timeouts

⚠️ **High CPU/Memory**: > 80% utilization
- Optimize algorithms
- Increase server resources
- Add horizontal scaling

## Continuous Load Testing

### GitHub Actions Integration

Create `.github/workflows/load-test.yml`:

```yaml
name: Load Testing
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install dependencies
        run: npm install --save-dev artillery
      
      - name: Run load test
        env:
          TARGET_URL: ${{ secrets.PRODUCTION_URL }}
        run: npx artillery run artillery.yml
      
      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: load-test-results
          path: results.json
```

### Local CI Integration

```bash
#!/bin/bash
# scripts/load-test.sh

set -e

echo "Starting application..."
npm run build
npm run start &
APP_PID=$!

sleep 5

echo "Running load test..."
npx artillery run artillery.yml

kill $APP_PID

echo "Load test complete!"
```

## Advanced Configuration

### Custom Metrics

Edit `load-tests/processor.js`:

```javascript
function afterResponse(requestParams, response, context, ee, next) {
  // Track custom metrics
  const duration = Date.now() - requestParams.timestamp;
  
  if (duration > 1000) {
    ee.emit('customStat', {
      stat: 'slowRequest',
      value: 1,
      tags: [`url:${requestParams.url}`]
    });
  }
  
  return next();
}
```

### Distributed Load Testing

Run from multiple locations:

```bash
# K6 Cloud (Official)
k6 cloud load-tests/k6-script.js

# Artillery Cloud (Third-party)
artillery cloud artillery.yml
```

## Optimization Tips

### Application Level

```typescript
// Add response caching
app.use(express.static('public', {
  maxAge: '1h'
}));

// Implement database query optimization
const results = await db.query.select('*').from('projects')
  .where('status', '=', 'ACTIVE')
  .limit(100);

// Add request compression
app.use(compression());
```

### Database Level

```sql
-- Create indexes for frequently queried fields
CREATE INDEX idx_project_status ON projects(status);
CREATE INDEX idx_user_email ON users(email);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM projects WHERE status = 'IN_PROGRESS';
```

### Infrastructure Level

```yaml
# Add more workers/replicas
replicas: 3

# Configure auto-scaling
minReplicas: 2
maxReplicas: 10
targetCPU: 70%

# Increase connection pool
DATABASE_POOL_MIN: 10
DATABASE_POOL_MAX: 40
```

## Troubleshooting

### High Memory Usage

```bash
# Enable garbage collection profiling
node --trace-gc load-tests/k6-script.js

# Check memory leaks
npm install -g clinic
clinic doctor -- node app.js
```

### Timeout Issues

```javascript
// Increase timeout
config: {
  timeout: 30000,  // 30 seconds
  ...
}
```

### Rate Limiting

```javascript
// Check if being rate limited
if (response.statusCode === 429) {
  console.log('Rate limited!');
  // Add backoff strategy
}
```

## Monitoring Tools

### Real-Time Monitoring

```bash
# Watch system metrics
watch -n 1 'free -h && ps aux | grep node'

# Monitor database
psql postgres -c "\watch (SELECT * FROM pg_stat_statements LIMIT 10)"
```

### Log Analysis

```bash
# Check application logs
tail -f logs/app.log | grep -i error

# Analyze slow requests
grep "duration" logs/app.log | sort -t: -k2 -rn | head -20
```

## Best Practices

✅ **DO:**
- Run tests against staging environment first
- Establish baseline before production testing
- Test during off-peak hours initially
- Monitor system resources during tests
- Document results and track trends
- Test incrementally (ramp up load gradually)

❌ **DON'T:**
- Run sustained high load on production without preparation
- Ignore warning signs (high error rates, timeouts)
- Test without monitoring infrastructure
- Load test without alerting stakeholders
- Forget to reset test data after tests

## Support

For load testing issues:
- Check log output for errors
- Verify target URL is correct
- Ensure database is healthy
- Check network connectivity
- Review application performance logs
