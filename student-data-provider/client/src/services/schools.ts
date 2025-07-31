import type { School } from '../types/school';
import type { ApiResponse } from '../types/apiResponse';
import { apiRequest } from './apiRequest';

export interface RegisterWebhookPayload {
  schoolId: string;
  webhookUrl: string;
  schoolName: string;
}

export const fetchSchools = (): Promise<ApiResponse<School[]>> => {
  return apiRequest('/schools');
};

export const registerSchool = (
  values: RegisterWebhookPayload
): Promise<ApiResponse<{ webhookSecret: string }>> => {
  return apiRequest('/registerWebhook', {
    method: 'POST',
    body: JSON.stringify(values),
  });
};
