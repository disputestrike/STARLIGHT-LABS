// lib/notifications.ts
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export type NotificationType =
  | "project_created"
  | "project_updated"
  | "project_completed"
  | "deal_created"
  | "deal_stage_changed"
  | "deal_closed"
  | "invoice_created"
  | "invoice_overdue"
  | "invoice_paid"
  | "task_assigned"
  | "task_completed"
  | "team_member_added"
  | "system_alert"
  | "announcement";

export const NOTIFICATION_TEMPLATES: Record<NotificationType, {
  title: string;
  message: string;
  icon: string;
  color: string;
}> = {
  project_created: {
    title: "New Project",
    message: "Project {{projectName}} has been created",
    icon: "📁",
    color: "#0052FF",
  },
  project_updated: {
    title: "Project Updated",
    message: "Project {{projectName}} has been updated",
    icon: "✏️",
    color: "#0052FF",
  },
  project_completed: {
    title: "Project Completed",
    message: "Project {{projectName}} has been completed",
    icon: "✅",
    color: "#00C853",
  },
  deal_created: {
    title: "New Deal",
    message: "Deal {{dealTitle}} has been created",
    icon: "🎯",
    color: "#FF9800",
  },
  deal_stage_changed: {
    title: "Deal Updated",
    message: "{{dealTitle}} moved to {{stage}}",
    icon: "📊",
    color: "#FF9800",
  },
  deal_closed: {
    title: "Deal Won! 🎉",
    message: "{{dealTitle}} has been closed",
    icon: "🏆",
    color: "#00C853",
  },
  invoice_created: {
    title: "Invoice Created",
    message: "Invoice #{{invoiceNumber}} has been created",
    icon: "📄",
    color: "#673AB7",
  },
  invoice_overdue: {
    title: "Payment Reminder",
    message: "Invoice #{{invoiceNumber}} is overdue",
    icon: "⏰",
    color: "#F44336",
  },
  invoice_paid: {
    title: "Payment Received",
    message: "Invoice #{{invoiceNumber}} has been paid",
    icon: "💰",
    color: "#00C853",
  },
  task_assigned: {
    title: "Task Assigned",
    message: "You have been assigned: {{taskTitle}}",
    icon: "📌",
    color: "#2196F3",
  },
  task_completed: {
    title: "Task Completed",
    message: "{{taskTitle}} has been completed",
    icon: "✓",
    color: "#00C853",
  },
  team_member_added: {
    title: "Team Member Added",
    message: "{{memberName}} has joined the team",
    icon: "👤",
    color: "#9C27B0",
  },
  system_alert: {
    title: "System Alert",
    message: "{{alertMessage}}",
    icon: "⚠️",
    color: "#FF5722",
  },
  announcement: {
    title: "Announcement",
    message: "{{announcementText}}",
    icon: "📢",
    color: "#3F51B5",
  },
};

/**
 * Format notification template with variables
 */
export function formatNotification(
  type: NotificationType,
  variables: Record<string, string>
): { title: string; message: string } {
  const template = NOTIFICATION_TEMPLATES[type];

  if (!template) {
    return { title: "Notification", message: "New notification" };
  }

  let title = template.title;
  let message = template.message;

  Object.entries(variables).forEach(([key, value]) => {
    title = title.replace(`{{${key}}}`, value);
    message = message.replace(`{{${key}}}`, value);
  });

  return { title, message };
}

/**
 * Notification priority levels
 */
export enum NotificationPriority {
  LOW = 0,
  NORMAL = 1,
  HIGH = 2,
  CRITICAL = 3,
}

/**
 * Get priority for notification type
 */
export function getNotificationPriority(type: NotificationType): NotificationPriority {
  const criticalTypes = ["invoice_overdue", "system_alert"];
  const highTypes = ["deal_closed", "project_completed", "invoice_paid"];

  if (criticalTypes.includes(type)) return NotificationPriority.CRITICAL;
  if (highTypes.includes(type)) return NotificationPriority.HIGH;
  return NotificationPriority.NORMAL;
}

/**
 * Notification delivery channels
 */
export type NotificationChannel = "in_app" | "email" | "sms" | "push" | "slack";

/**
 * Get recommended channels for notification type
 */
export function getRecommendedChannels(type: NotificationType): NotificationChannel[] {
  const emailChannels = ["invoice_overdue", "invoice_paid", "project_completed"];
  const smsChannels = ["invoice_overdue", "deal_closed"];
  const slackChannels = ["deal_created", "deal_closed", "project_completed"];

  const channels: NotificationChannel[] = ["in_app"]; // Always in-app

  if (emailChannels.includes(type)) channels.push("email");
  if (smsChannels.includes(type)) channels.push("sms");
  if (slackChannels.includes(type)) channels.push("slack");

  return channels;
}
