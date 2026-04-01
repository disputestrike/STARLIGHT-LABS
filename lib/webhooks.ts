// lib/webhooks.ts
import crypto from 'crypto';

interface WebhookPayload {
  event: string;
  timestamp: string;
  data: Record<string, any>;
}

interface Webhook {
  id: string;
  url: string;
  secret: string;
  events: string[];
  active: boolean;
}

/**
 * Generate HMAC signature for webhook authenticity
 */
export function generateWebhookSignature(
  payload: WebhookPayload,
  secret: string
): string {
  const message = JSON.stringify(payload);
  return crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex');
}

/**
 * Verify webhook signature from incoming request
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const computed = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computed)
  );
}

/**
 * Dispatch webhook event to registered webhooks
 */
export async function dispatchWebhook(
  event: string,
  data: Record<string, any>,
  webhooks: Webhook[]
): Promise<{
  successful: number;
  failed: number;
  results: Array<{ webhookId: string; success: boolean; error?: string }>;
}> {
  const payload: WebhookPayload = {
    event,
    timestamp: new Date().toISOString(),
    data,
  };

  const results: Array<{
    webhookId: string;
    success: boolean;
    error?: string;
  }> = [];
  let successful = 0;
  let failed = 0;

  // Filter webhooks that should receive this event
  const targetWebhooks = webhooks.filter(
    (w) => w.active && w.events.includes(event)
  );

  for (const webhook of targetWebhooks) {
    try {
      const signature = generateWebhookSignature(payload, webhook.secret);

      const response = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
          'X-Webhook-Id': webhook.id,
          'X-Webhook-Timestamp': payload.timestamp,
          'X-Webhook-Event': event,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });

      if (response.ok) {
        successful++;
        results.push({ webhookId: webhook.id, success: true });
      } else {
        failed++;
        results.push({
          webhookId: webhook.id,
          success: false,
          error: `HTTP ${response.status}`,
        });
      }
    } catch (error) {
      failed++;
      results.push({
        webhookId: webhook.id,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return { successful, failed, results };
}

/**
 * Retry failed webhook delivery with exponential backoff
 */
export async function retryWebhookDelivery(
  webhook: Webhook,
  payload: WebhookPayload,
  maxRetries = 3,
  baseDelay = 1000
): Promise<boolean> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const signature = generateWebhookSignature(payload, webhook.secret);

      const response = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
          'X-Webhook-Id': webhook.id,
          'X-Webhook-Timestamp': payload.timestamp,
          'X-Webhook-Event': payload.event,
          'X-Webhook-Attempt': `${attempt + 1}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return true;
      }

      // Don't retry on client errors
      if (response.status >= 400 && response.status < 500) {
        return false;
      }
    } catch (error) {
      // Retry on network errors
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt); // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  return false;
}

/**
 * Webhook event types
 */
export const WEBHOOK_EVENTS = {
  // Project events
  'project.created': 'Project created',
  'project.updated': 'Project updated',
  'project.completed': 'Project completed',
  'project.deleted': 'Project deleted',

  // Deal events
  'deal.created': 'Deal created',
  'deal.updated': 'Deal updated',
  'deal.stage_changed': 'Deal stage changed',
  'deal.closed': 'Deal closed',
  'deal.lost': 'Deal lost',

  // Invoice events
  'invoice.created': 'Invoice created',
  'invoice.sent': 'Invoice sent',
  'invoice.paid': 'Invoice paid',
  'invoice.overdue': 'Invoice overdue',

  // Task events
  'task.created': 'Task created',
  'task.updated': 'Task updated',
  'task.completed': 'Task completed',

  // User events
  'user.created': 'User created',
  'user.updated': 'User updated',
  'user.deleted': 'User deleted',
} as const;
