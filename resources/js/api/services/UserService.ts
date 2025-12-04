import {
	ApiError,
	LoginRequest,
	LoginResponse,
	RegisterRequest,
} from '@/types/auth.ts';

import { Endpoints } from '@/api/endpoints.ts';
import instance from '@/api/instance.ts';

export default class UserService {
	static async login(data: LoginRequest): Promise<LoginResponse> {
		try {
			const response = await instance.post(Endpoints.USER.LOGIN, data);
			return response.data;
		} catch (error: any) {
			if (error.response?.data) {
				throw error.response.data as ApiError;
			}
			throw {
				message: 'Ошибка сети',
				errors: {},
			} as ApiError;
		}
	}
	static async getProfile(): Promise<LoginResponse> {
		try {
			const { data } = await instance.get(Endpoints.USER.ME);
			const response = {
				user: data,
			};
			return response as LoginResponse;
		} catch (error: any) {
			if (error.response?.data) {
				throw error.response.data as ApiError;
			}
			throw {
				message: 'Ошибка сети',
				errors: {},
			} as ApiError;
		}
	}
	static async registration(data: RegisterRequest): Promise<LoginResponse> {
		try {
			const response = await instance.post(
				Endpoints.USER.REGISTRATION,
				data
			);
			return response.data;
		} catch (error: any) {
			if (error.response?.data) {
				throw error.response.data as ApiError;
			}
			throw {
				message: 'Ошибка сети',
				errors: {},
			} as ApiError;
		}
	}
}
