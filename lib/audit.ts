// lib/audit.ts
export interface AuditLog {
  id: string;
  userId: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  changes?: {
    before: Record<string, any>;
    after: Record<string, any>;
  };
  ipAddress: string;
  userAgent: string;
  status: "success" | "failure";
  timestamp: Date;
  details?: string;
}

export type AuditAction =
  | "CREATE"
  | "READ"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "EXPORT"
  | "IMPORT"
  | "SHARE"
  | "PERMISSION_CHANGE"
  | "SECURITY_EVENT"
  | "DATA_BREACH"
  | "BACKUP"
  | "RESTORE";

export interface AuditQuery {
  userId?: string;
  action?: AuditAction;
  resource?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

/**
 * Create audit log entry
 */
export async function createAuditLog(
  userId: string,
  action: AuditAction,
  resource: string,
  resourceId: string,
  options?: {
    changes?: AuditLog["changes"];
    ipAddress?: string;
    userAgent?: string;
    status?: "success" | "failure";
    details?: string;
  }
): Promise<AuditLog> {
  const log: AuditLog = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    action,
    resource,
    resourceId,
    changes: options?.changes,
    ipAddress: options?.ipAddress || "unknown",
    userAgent: options?.userAgent || "unknown",
    status: options?.status || "success",
    timestamp: new Date(),
    details: options?.details,
  };

  // In production, save to database
  console.log("[AUDIT]", log);

  return log;
}

/**
 * Query audit logs with filtering
 */
export async function queryAuditLogs(query: AuditQuery): Promise<AuditLog[]> {
  // In production, query from database with filters
  const logs: AuditLog[] = [];

  // Example implementation
  if (query.userId) {
    // Filter by userId
  }
  if (query.action) {
    // Filter by action
  }
  if (query.resource) {
    // Filter by resource
  }
  if (query.startDate && query.endDate) {
    // Filter by date range
  }

  return logs;
}

/**
 * Get compliance report for data privacy regulations
 */
export interface ComplianceReport {
  period: {
    from: Date;
    to: Date;
  };
  summary: {
    totalActions: number;
    uniqueUsers: number;
    failedAttempts: number;
    securityEvents: number;
  };
  activityByAction: Record<AuditAction, number>;
  activityByResource: Record<string, number>;
  securityIncidents: AuditLog[];
  dataAccessPatterns: Array<{
    user: string;
    resource: string;
    accessCount: number;
    lastAccess: Date;
  }>;
}

export async function generateComplianceReport(
  startDate: Date,
  endDate: Date
): Promise<ComplianceReport> {
  // In production, query from database
  return {
    period: { from: startDate, to: endDate },
    summary: {
      totalActions: 1250,
      uniqueUsers: 45,
      failedAttempts: 12,
      securityEvents: 3,
    },
    activityByAction: {
      CREATE: 250,
      READ: 600,
      UPDATE: 300,
      DELETE: 50,
      LOGIN: 100,
      LOGOUT: 95,
      EXPORT: 25,
      IMPORT: 10,
      SHARE: 45,
      PERMISSION_CHANGE: 15,
      SECURITY_EVENT: 3,
      DATA_BREACH: 0,
      BACKUP: 5,
      RESTORE: 2,
    },
    activityByResource: {
      "Project": 400,
      "Deal": 300,
      "Invoice": 250,
      "User": 150,
      "Task": 150,
    },
    securityIncidents: [],
    dataAccessPatterns: [
      {
        user: "user1",
        resource: "Invoice",
        accessCount: 125,
        lastAccess: new Date(),
      },
    ],
  };
}

/**
 * Data retention policy
 */
export const RETENTION_POLICIES: Record<string, number> = {
  audit_logs: 365 * 2, // 2 years
  deleted_records: 90, // 90 days
  failed_logins: 365, // 1 year
  access_logs: 365, // 1 year
  backup_logs: 365 * 7, // 7 years for compliance
};

/**
 * Check if record should be retained
 */
export function shouldRetainRecord(
  resourceType: string,
  createdDate: Date
): boolean {
  const retentionDays = RETENTION_POLICIES[resourceType] || 365;
  const expirationDate = new Date(createdDate);
  expirationDate.setDate(expirationDate.getDate() + retentionDays);

  return new Date() < expirationDate;
}

/**
 * Data classification levels
 */
export enum DataClassification {
  PUBLIC = "public",
  INTERNAL = "internal",
  CONFIDENTIAL = "confidential",
  RESTRICTED = "restricted",
}

/**
 * Get data classification
 */
export function getDataClassification(resource: string): DataClassification {
  const classified: Record<string, DataClassification> = {
    "Invoice": DataClassification.CONFIDENTIAL,
    "Employee": DataClassification.RESTRICTED,
    "SocialSecurity": DataClassification.RESTRICTED,
    "HealthRecord": DataClassification.RESTRICTED,
    "Deal": DataClassification.INTERNAL,
    "Project": DataClassification.INTERNAL,
    "PublicInfo": DataClassification.PUBLIC,
  };

  return classified[resource] || DataClassification.INTERNAL;
}
