export interface WebhookLog {
  id: string;
  schoolId: string;
  webhookUrl: string;
  eventType: string;
  status: 'success' | 'error';
  timestamp: string; // ISO date string
  response?: string; // Optional, for error details
}
