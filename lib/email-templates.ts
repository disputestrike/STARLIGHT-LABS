// lib/email-templates.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailContext {
  [key: string]: string | number | boolean | undefined;
}

export const EMAIL_TEMPLATES = {
  // User templates
  WELCOME: {
    subject: "Welcome to Starlight Labs",
    template: "welcome",
  },
  PASSWORD_RESET: {
    subject: "Reset Your Password",
    template: "password-reset",
  },
  EMAIL_VERIFICATION: {
    subject: "Verify Your Email",
    template: "email-verification",
  },

  // Project templates
  PROJECT_CREATED: {
    subject: "New Project Created: {{projectName}}",
    template: "project-created",
  },
  PROJECT_COMPLETED: {
    subject: "Project Completed: {{projectName}}",
    template: "project-completed",
  },
  PROJECT_DELAYED: {
    subject: "Project Alert: {{projectName}} is Delayed",
    template: "project-delayed",
  },

  // Invoice templates
  INVOICE_CREATED: {
    subject: "Invoice #{{invoiceNumber}} Created",
    template: "invoice-created",
  },
  INVOICE_SENT: {
    subject: "Invoice #{{invoiceNumber}} Ready for Payment",
    template: "invoice-sent",
  },
  INVOICE_OVERDUE: {
    subject: "Payment Reminder: Invoice #{{invoiceNumber}}",
    template: "invoice-overdue",
  },
  INVOICE_PAID: {
    subject: "Payment Received for Invoice #{{invoiceNumber}}",
    template: "invoice-paid",
  },

  // Deal templates
  DEAL_CREATED: {
    subject: "New Deal: {{dealTitle}}",
    template: "deal-created",
  },
  DEAL_STAGE_CHANGED: {
    subject: "Deal Update: {{dealTitle}} → {{newStage}}",
    template: "deal-stage-changed",
  },
  DEAL_CLOSED_WON: {
    subject: "Deal Won! 🎉 {{dealTitle}}",
    template: "deal-closed-won",
  },

  // Task templates
  TASK_ASSIGNED: {
    subject: "New Task Assigned: {{taskTitle}}",
    template: "task-assigned",
  },
  TASK_COMPLETED: {
    subject: "Task Completed: {{taskTitle}}",
    template: "task-completed",
  },

  // System templates
  DAILY_SUMMARY: {
    subject: "Daily Summary - {{date}}",
    template: "daily-summary",
  },
  WEEKLY_REPORT: {
    subject: "Weekly Report - {{week}}",
    template: "weekly-report",
  },
};

/**
 * Send templated email using Resend
 */
export async function sendEmail(
  templateKey: keyof typeof EMAIL_TEMPLATES,
  to: string | string[],
  context: EmailContext
) {
  try {
    const template = EMAIL_TEMPLATES[templateKey];

    if (!template) {
      throw new Error(`Template ${templateKey} not found`);
    }

    // Replace template variables
    const subject = Object.entries(context).reduce(
      (str, [key, value]) =>
        str.replace(`{{${key}}}`, String(value || "")),
      template.subject
    );

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@starlabs.dev",
      to: Array.isArray(to) ? to : [to],
      subject,
      html: generateHtmlEmail(template.template, context),
    });

    return response;
  } catch (error) {
    console.error(`Error sending email (${templateKey}):`, error);
    throw error;
  }
}

/**
 * Generate HTML email from template
 */
function generateHtmlEmail(templateName: string, context: EmailContext): string {
  const templates: Record<string, (ctx: EmailContext) => string> = {
    welcome: (ctx) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome to Starlight Labs! 👋</h1>
        <p>Hi ${ctx.firstName},</p>
        <p>Thank you for joining Starlight Labs. We're excited to have you on board!</p>
        <p>Get started with:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Explore your dashboard</li>
          <li>Create your first project</li>
        </ul>
        <a href="${ctx.dashboardUrl}" style="background: #0052FF; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">
          Go to Dashboard
        </a>
        <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
          <p>© 2024 Starlight Labs. All rights reserved.</p>
        </footer>
      </div>
    `,

    "invoice-created": (ctx) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Invoice #${ctx.invoiceNumber} Created</h1>
        <p>Invoice Details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd;">Client</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${ctx.clientName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Amount</td>
            <td style="padding: 10px; border: 1px solid #ddd;">$${ctx.totalAmount}</td>
          </tr>
          <tr style="background: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd;">Due Date</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${ctx.dueDate}</td>
          </tr>
        </table>
        <a href="${ctx.invoiceUrl}" style="background: #0052FF; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">
          View Invoice
        </a>
      </div>
    `,

    "deal-closed-won": (ctx) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
        <h1>🎉 Deal Won!</h1>
        <h2>${ctx.dealTitle}</h2>
        <p style="font-size: 24px; color: #00C853; font-weight: bold;">
          $${ctx.dealValue}
        </p>
        <p>Congratulations! The deal with ${ctx.clientName} has been closed.</p>
        <a href="${ctx.dealUrl}" style="background: #00C853; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 20px;">
          View Deal
        </a>
      </div>
    `,

    "daily-summary": (ctx) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Daily Summary - ${ctx.date}</h1>
        <h3>Today's Highlights</h3>
        <ul>
          <li>${ctx.newProjects} new projects</li>
          <li>${ctx.newDeals} new deals</li>
          <li>${ctx.tasksCompleted} tasks completed</li>
          <li>$${ctx.dailyRevenue} revenue</li>
        </ul>
        <a href="${ctx.dashboardUrl}" style="background: #0052FF; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">
          View Full Dashboard
        </a>
      </div>
    `,
  };

  const template = templates[templateName];
  if (!template) {
    console.warn(`Email template ${templateName} not found, using default`);
    return `<p>Hello,</p><p>This is a notification from Starlight Labs.</p>`;
  }

  return template(context);
}

/**
 * Send batch emails
 */
export async function sendBatchEmails(
  templateKey: keyof typeof EMAIL_TEMPLATES,
  recipients: Array<{ email: string; context: EmailContext }>
) {
  const results = await Promise.allSettled(
    recipients.map(({ email, context }) => sendEmail(templateKey, email, context))
  );

  const successful = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  return { successful, failed, results };
}
