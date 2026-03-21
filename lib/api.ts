// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function apiCall(
  endpoint: string,
  method = "GET",
  body?: unknown,
  includeAuth = true
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}/api${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "API request failed");
  }

  return response.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiCall("/auth/login", "POST", { email, password }, false),
  register: (email: string, password: string, firstName: string, lastName: string) =>
    apiCall("/auth/register", "POST", { email, password, firstName, lastName }, false),

  // Users
  getUsers: () => apiCall("/users"),
  getEngineers: () => apiCall("/users/engineers"),

  // Projects
  getProjects: () => apiCall("/projects"),
  createProject: (data: unknown) => apiCall("/projects", "POST", data),
  getProject: (id: string) => apiCall(`/projects/${id}`),
  updateProject: (id: string, data: unknown) => apiCall(`/projects/${id}`, "PUT", data),
  deleteProject: (id: string) => apiCall(`/projects/${id}`, "DELETE"),

  // Sprints
  getSprints: (projectId?: string) =>
    apiCall(`/projects/sprints${projectId ? `?projectId=${projectId}` : ""}`),
  createSprint: (data: unknown) => apiCall("/projects/sprints", "POST", data),

  // Tasks
  getTasks: (projectId?: string, sprintId?: string) => {
    const params = new URLSearchParams();
    if (projectId) params.append("projectId", projectId);
    if (sprintId) params.append("sprintId", sprintId);
    return apiCall(`/projects/tasks?${params.toString()}`);
  },
  createTask: (data: unknown) => apiCall("/projects/tasks", "POST", data),

  // Talent
  getBootcampCohorts: () => apiCall("/talent/bootcamp"),
  getEnrollments: (cohortId?: string) =>
    apiCall(`/talent/enrollment${cohortId ? `?cohortId=${cohortId}` : ""}`),
  createEnrollment: (data: unknown) => apiCall("/talent/enrollment", "POST", data),

  // Sales
  getClients: () => apiCall("/sales/clients"),
  createClient: (data: unknown) => apiCall("/sales/clients", "POST", data),
  getDeals: () => apiCall("/sales/deals"),
  createDeal: (data: unknown) => apiCall("/sales/deals", "POST", data),

  // Financial
  getInvoices: () => apiCall("/financial/invoices"),
  getExpenses: (projectId?: string, status?: string) => {
    const params = new URLSearchParams();
    if (projectId) params.append("projectId", projectId);
    if (status) params.append("status", status);
    return apiCall(`/financial/expenses?${params.toString()}`);
  },
  createExpense: (data: unknown) => apiCall("/financial/expenses", "POST", data),
  getPayroll: (userId?: string, monthYear?: string) => {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (monthYear) params.append("monthYear", monthYear);
    return apiCall(`/financial/payroll?${params.toString()}`);
  },
  createPayroll: (data: unknown) => apiCall("/financial/payroll", "POST", data),

  // Admin
  getDashboard: () => apiCall("/admin/dashboard"),

  // Notifications
  getNotifications: (unreadOnly = false) =>
    apiCall(`/notifications?unreadOnly=${unreadOnly}`),
  markNotificationAsRead: (id: string) => apiCall(`/notifications?id=${id}`, "PUT"),
};
