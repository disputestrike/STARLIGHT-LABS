// load-tests/processor.js
/**
 * Artillery Processor
 * Custom functions for load testing scenarios
 */

// Generate realistic test data
function generateUser() {
  const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return {
    email: `${first.toLowerCase()}.${last.toLowerCase()}${Math.random().toString(36).substr(2, 9)}@example.com`,
    firstName: first,
    lastName: last,
    password: 'LoadTest@2024!'
  };
}

function generateProject() {
  const adjectives = ['Enterprise', 'Mobile', 'Cloud', 'AI-Powered', 'Data', 'Analytics'];
  const nouns = ['Platform', 'System', 'Dashboard', 'Tool', 'Suite', 'Solution'];
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return {
    name: `${adj} ${noun} - Load Test ${Date.now()}`,
    description: `Automated load testing project - ${new Date().toISOString()}`,
    budget: Math.floor(Math.random() * 500000) + 50000
  };
}

function generateDeal() {
  const companies = ['Tech Corp', 'Enterprise Inc', 'Global Systems', 'Innovation Labs'];
  const company = companies[Math.floor(Math.random() * companies.length)];
  
  return {
    title: `${company} - Deal ${Date.now()}`,
    description: `Load testing deal for ${company}`,
    value: Math.floor(Math.random() * 1000000) + 100000,
    probability: Math.floor(Math.random() * 100),
    stage: ['LEAD', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION'][Math.floor(Math.random() * 4)]
  };
}

// Setup functions
function beforeRequest(requestParams, context, ee, next) {
  // Add timing metadata
  requestParams.headers = requestParams.headers || {};
  requestParams.timestamp = Date.now();
  
  return next();
}

function afterResponse(requestParams, response, context, ee, next) {
  // Track performance metrics
  const duration = Date.now() - requestParams.timestamp;
  
  if (duration > 1000) {
    ee.emit('customStat', {
      stat: 'slowRequest',
      value: 1,
      tags: [`url:${requestParams.url}`, `status:${response.statusCode}`]
    });
  }
  
  if (response.statusCode >= 400) {
    ee.emit('customStat', {
      stat: 'errorResponse',
      value: 1,
      tags: [`status:${response.statusCode}`, `url:${requestParams.url}`]
    });
  }
  
  return next();
}

// Export functions
module.exports = {
  generateUser,
  generateProject,
  generateDeal,
  beforeRequest,
  afterResponse
};
