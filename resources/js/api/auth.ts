import http from './http';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ValidationErrors,
} from '../types/auth';

export async function apiLogin(
  payload: LoginRequest,
): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>('/auth/login', payload);
  return data;
}

export async function apiRegister(
  payload: RegisterRequest,
): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>('/auth/register', payload);
  return data;
}

// Парсинг ошибок с бэка
export function parseValidationErrors(error: unknown): ValidationErrors | null {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    (error as any).response &&
    (error as any).response.data &&
    (error as any).response.data.errors
  ) {
    return (error as any).response.data.errors as ValidationErrors;
  }

  return null;
}
