export type UserRole = 'get' | 'post' | 'superadmin';

export interface User {
	id: number;
	name: string;
	email: string;
	role: UserRole;
	emailVerifiedAt: string | null;
	createdAt: Date;
	updatedAt: Date;
}
export interface AuthUser extends User {
	password: string;
}
//============LOGIN============
export type LoginRequest = Pick<AuthUser, 'email' | 'password'>;

export interface LoginResponse {
	token: string;
	user: User;
}

//============REGISTRATION============
export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	role: 'get' | 'post';
}
//============ERRORS============

export interface ApiError {
	message: string;
	errors?: Record<string, string[]>;
}
