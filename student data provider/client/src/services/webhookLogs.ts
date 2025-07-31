import type { ApiResponse } from '../types/apiResponse';
import type { WebhookLog } from '../types/webhook';
import { apiRequest } from './apiRequest';

export const fetchWebhookLogs = async (schoolId?: string) => {
  const url = `/webhook-events?schoolId=${schoolId}`;
  console.log(url);
  const res = await apiRequest<ApiResponse<WebhookLog[]>>(url);
  console.log(res);
  return res.data;
};
