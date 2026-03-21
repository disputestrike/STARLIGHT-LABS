// load-tests/k6-script.js
/**
 * K6 Load Testing Script
 * Run: k6 run load-tests/k6-script.js
 * 
 * Performance thresholds:
 * - 95% of requests < 1000ms
 * - 99% of requests < 2000ms
 * - Error rate < 1%
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter, Gauge } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const apiDuration = new Trend('api_duration');
const authDuration = new Trend('auth_duration');
const projectDuration = new Trend('project_duration');
const salesDuration = new Trend('sales_duration');
const requestCounter = new Counter('http_requests_total');
const activeUsers = new Gauge('vus');

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Ramp-up to 20 users
    { duration: '1m30s', target: 50 }, // Ramp-up to 50 users
    { duration: '1m', target: 100 },   // Ramp-up to 100 users
    { duration: '2m', target: 100 },   // Stay at 100 users
    { duration: '1m', target: 50 },    // Ramp-down to 50 users
    { duration: '30s', target: 0 },    // Ramp-down to 0 users
  ],
  thresholds: {
    // 95% of requests must complete below 1000ms
    'api_duration': ['p(95)<1000', 'p(99)<2000'],
    // Error rate must stay below 1%
    'errors': ['rate<0.01'],
    // HTTP requests
    'http_req_duration': ['p(95)<1000', 'p(99)<2000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const AUTH_TOKEN = __ENV.AUTH_TOKEN || '';

// Test data
const users = [
  { email: 'admin@example.com', password: 'AdminPass123!' },
  { email: 'user1@example.com', password: 'UserPass123!' },
  { email: 'user2@example.com', password: 'UserPass123!' },
];

export default function () {
  activeUsers.add(__VU);
  
  // Auth workflow
  group('Authentication', () => {
    authWorkflow();
  });

  sleep(2);

  // Project management workflow
  group('Project Management', () => {
    projectWorkflow();
  });

  sleep(2);

  // Sales pipeline workflow
  group('Sales Pipeline', () => {
    salesWorkflow();
  });

  sleep(2);

  // Financial operations
  group('Financial Operations', () => {
    financialWorkflow();
  });

  sleep(2);

  // API health check
  group('System Health', () => {
    healthCheckWorkflow();
  });

  activeUsers.add(-1);
}

function authWorkflow() {
  // Login
  const loginPayload = {
    email: users[Math.floor(Math.random() * users.length)].email,
    password: 'UserPass123!',
  };

  const loginResponse = http.post(`${BASE_URL}/api/auth/login`, JSON.stringify(loginPayload), {
    headers: { 'Content-Type': 'application/json' },
  });

  const loginSuccess = check(loginResponse, {
    'login status is 200': (r) => r.status === 200,
    'login returns token': (r) => r.json('token') !== undefined,
    'login response time OK': (r) => r.timings.duration < 500,
  });

  authDuration.add(loginResponse.timings.duration);
  errorRate.add(!loginSuccess);
  requestCounter.add(1);
}

function projectWorkflow() {
  const projectPayload = {
    name: `Load Test Project ${Date.now()}`,
    description: 'Automated load testing project',
    clientId: 'client-123',
    startDate: new Date().toISOString(),
    targetEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    budget: 150000,
  };

  const projectResponse = http.post(`${BASE_URL}/api/projects`, JSON.stringify(projectPayload), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  });

  const projectSuccess = check(projectResponse, {
    'project creation status is 201': (r) => r.status === 201,
    'project response time OK': (r) => r.timings.duration < 1000,
  });

  projectDuration.add(projectResponse.timings.duration);
  errorRate.add(!projectSuccess);
  requestCounter.add(1);

  sleep(1);

  // Get projects
  const getProjectsResponse = http.get(`${BASE_URL}/api/projects`, {
    headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` },
  });

  const getProjectsSuccess = check(getProjectsResponse, {
    'get projects status is 200': (r) => r.status === 200,
    'get projects returns array': (r) => Array.isArray(r.json()),
    'get projects response time OK': (r) => r.timings.duration < 500,
  });

  projectDuration.add(getProjectsResponse.timings.duration);
  errorRate.add(!getProjectsSuccess);
  requestCounter.add(1);
}

function salesWorkflow() {
  // Get clients
  const clientsResponse = http.get(`${BASE_URL}/api/sales/clients`, {
    headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` },
  });

  const clientsSuccess = check(clientsResponse, {
    'get clients status is 200': (r) => r.status === 200,
    'get clients response time OK': (r) => r.timings.duration < 500,
  });

  salesDuration.add(clientsResponse.timings.duration);
  errorRate.add(!clientsSuccess);
  requestCounter.add(1);

  sleep(1);

  // Create deal
  const dealPayload = {
    title: `Deal ${Date.now()}`,
    description: 'Load testing deal',
    clientId: 'client-123',
    value: 500000,
    probability: 75,
    stage: 'PROPOSAL',
  };

  const dealResponse = http.post(`${BASE_URL}/api/sales/deals`, JSON.stringify(dealPayload), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  });

  const dealSuccess = check(dealResponse, {
    'deal creation status is 201': (r) => r.status === 201,
    'deal response time OK': (r) => r.timings.duration < 1000,
  });

  salesDuration.add(dealResponse.timings.duration);
  errorRate.add(!dealSuccess);
  requestCounter.add(1);

  sleep(1);

  // Get deals
  const dealsResponse = http.get(`${BASE_URL}/api/sales/deals`, {
    headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` },
  });

  const dealsSuccess = check(dealsResponse, {
    'get deals status is 200': (r) => r.status === 200,
    'get deals response time OK': (r) => r.timings.duration < 500,
  });

  salesDuration.add(dealsResponse.timings.duration);
  errorRate.add(!dealsSuccess);
  requestCounter.add(1);
}

function financialWorkflow() {
  // Get invoices
  const invoicesResponse = http.get(`${BASE_URL}/api/financial/invoices`, {
    headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` },
  });

  const invoicesSuccess = check(invoicesResponse, {
    'get invoices status is 200': (r) => r.status === 200,
    'get invoices response time OK': (r) => r.timings.duration < 500,
  });

  apiDuration.add(invoicesResponse.timings.duration);
  errorRate.add(!invoicesSuccess);
  requestCounter.add(1);

  sleep(1);

  // Get expenses
  const expensesResponse = http.get(`${BASE_URL}/api/financial/expenses`, {
    headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` },
  });

  const expensesSuccess = check(expensesResponse, {
    'get expenses status is 200': (r) => r.status === 200,
    'get expenses response time OK': (r) => r.timings.duration < 500,
  });

  apiDuration.add(expensesResponse.timings.duration);
  errorRate.add(!expensesSuccess);
  requestCounter.add(1);
}

function healthCheckWorkflow() {
  const healthResponse = http.get(`${BASE_URL}/api/health`);

  const healthSuccess = check(healthResponse, {
    'health check status is 200': (r) => r.status === 200,
    'health check response time OK': (r) => r.timings.duration < 100,
    'system is healthy': (r) => r.json('status') === 'healthy',
  });

  apiDuration.add(healthResponse.timings.duration);
  errorRate.add(!healthSuccess);
  requestCounter.add(1);
}
