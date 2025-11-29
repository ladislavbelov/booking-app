export type UserRole = 'get' | 'post' | 'superadmin';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirmation: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface ValidationErrors {
  [field: string]: string[];
}
