import type { Student } from '../types/students';
import type { ApiResponse } from '../types/apiResponse';
import { apiRequest } from './apiRequest';

export const fetchAllStudents = (
  page: number = 1
): Promise<ApiResponse<Student[]>> => {
  return apiRequest(`/students?page=${page}`);
};

export const addStudent = (
  studentData: Student
): Promise<ApiResponse<Student>> => {
  return apiRequest('/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
  });
};
