// types/index.ts
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
}

export enum UserRole {
  ADMIN = "ADMIN",
  DELIVERY_LEAD = "DELIVERY_LEAD",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  QA_LEAD = "QA_LEAD",
  ENGINEER = "ENGINEER",
  SDR = "SDR",
  ACCOUNT_EXECUTIVE = "ACCOUNT_EXECUTIVE",
  TALENT_MANAGER = "TALENT_MANAGER",
  FOUNDER = "FOUNDER",
  FINANCE = "FINANCE",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  clientId: string;
  startDate: Date;
  targetEndDate: Date;
  budget: number;
  revenue: number;
  createdAt: Date;
}

export enum ProjectStatus {
  PLANNING = "PLANNING",
  SETUP = "SETUP",
  IN_PROGRESS = "IN_PROGRESS",
  ON_HOLD = "ON_HOLD",
  IN_REVIEW = "IN_REVIEW",
  COMPLETED = "COMPLETED",
}

export interface Sprint {
  id: string;
  projectId: string;
  sprintNumber: number;
  status: SprintStatus;
  startDate: Date;
  endDate: Date;
  goal?: string;
  plannedStoryPoints: number;
  completedStoryPoints: number;
}

export enum SprintStatus {
  PLANNING = "PLANNING",
  ACTIVE = "ACTIVE",
  IN_REVIEW = "IN_REVIEW",
  COMPLETED = "COMPLETED",
}

export interface Task {
  id: string;
  projectId: string;
  sprintId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  storyPoints: number;
  estimatedHours: number;
  actualHours?: number;
  dueDate?: Date;
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface Deal {
  id: string;
  clientId: string;
  title: string;
  value: number;
  probability: number;
  stage: DealStage;
  status: DealStatus;
  createdAt: Date;
}

export enum DealStage {
  LEAD = "LEAD",
  QUALIFIED = "QUALIFIED",
  PROPOSAL = "PROPOSAL",
  NEGOTIATION = "NEGOTIATION",
  CLOSED_WON = "CLOSED_WON",
  CLOSED_LOST = "CLOSED_LOST",
}

export enum DealStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  totalAmount: number;
  description?: string;
}

export enum InvoiceStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  ACCEPTED = "ACCEPTED",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

export interface DashboardMetrics {
  totalEngineers: number;
  activeProjects: number;
  totalRevenue: number;
  totalExpenses: number;
  grossMargin: number;
  utilization: number;
  runway: number;
}

export interface AuthToken {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
