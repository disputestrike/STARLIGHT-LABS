// load-tests/autocannon-config.js
/**
 * Autocannon Load Testing Configuration
 * Quick performance baseline testing
 * Run: npx autocannon -c autocannon-config.js http://localhost:3000
 */

module.exports = {
  // Connection settings
  url: process.env.TARGET_URL || 'http://localhost:3000',
  connections: 10,
  pipelining: 1,
  duration: 30,
  
  // Request configuration
  requests: [
    // Homepage
    {
      path: '/',
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    },
    // Health check
    {
      path: '/api/health',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    // Dashboard (requires auth)
    {
      path: '/api/admin/dashboard',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
      },
    },
    // Projects list
    {
      path: '/api/projects',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
      },
    },
    // Create project
    {
      path: '/api/projects',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
      },
      body: JSON.stringify({
        name: `Load Test Project ${Date.now()}`,
        description: 'Autocannon performance test',
        clientId: 'client-123',
        startDate: new Date().toISOString(),
        targetEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        budget: 100000,
      }),
    },
    // Sales deals
    {
      path: '/api/sales/deals',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
      },
    },
    // Financial invoices
    {
      path: '/api/financial/invoices',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
      },
    },
    // Talent bootcamp
    {
      path: '/api/talent/bootcamp',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
      },
    },
    // Team users
    {
      path: '/api/users',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
      },
    },
    // Audit logs
    {
      path: '/api/admin/audit-logs',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
      },
    },
  ],
  
  // Output configuration
  setupClient: setupClient,
  setupServer: null,
  teardown: null,
  
  // Performance assertions
  callbacks: [
    {
      on: 'done',
      function: (results) => {
        console.log('\n=== LOAD TEST RESULTS ===\n');
        
        console.log(`Requests: ${results.requests.total}`);
        console.log(`Throughput: ${results.throughput.total} req/sec`);
        console.log(`Duration: ${results.duration} seconds`);
        
        console.log('\nLatency:');
        console.log(`  Mean: ${results.latency.mean}ms`);
        console.log(`  Median: ${results.latency.median}ms`);
        console.log(`  P95: ${results.latency.p95}ms`);
        console.log(`  P99: ${results.latency.p99}ms`);
        
        console.log('\nErrors:');
        console.log(`  Total: ${results.errors}`);
        console.log(`  Rate: ${((results.errors / results.requests.total) * 100).toFixed(2)}%`);
        
        console.log('\nStatus Codes:');
        Object.entries(results.statusCodeStats).forEach(([code, stats]) => {
          console.log(`  ${code}: ${stats.count}`);
        });
        
        // Assertions
        const errorRate = results.errors / results.requests.total;
        if (errorRate > 0.01) {
          console.log('\n⚠️  WARNING: Error rate > 1%');
        }
        
        if (results.latency.p95 > 1000) {
          console.log('⚠️  WARNING: P95 latency > 1000ms');
        }
        
        if (results.latency.p99 > 2000) {
          console.log('⚠️  WARNING: P99 latency > 2000ms');
        }
        
        console.log('\n========================\n');
      },
    },
  ],
};

function setupClient(client) {
  client.on('response', (statusCode, resBytes, responseTime) => {
    // Track per-request metrics if needed
  });
}
