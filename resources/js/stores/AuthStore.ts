import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ApiError, LoginRequest, RegisterRequest, User } from '@/types/auth.ts';
import UserService from '@/api/services/UserService.ts';

export const useAuthStore = defineStore('auth', () => {
	// Initial State
	const user = ref<User | null>(null);
	const token = ref<string | null>(null);
	const isLoading = ref<boolean>(false);
	const validationErrors = ref<Record<string, string[]> | null>(null);
	const error = ref<string | null>(null);
	const isInitialized = ref<boolean>(false);
	// Getters
	const isAuthenticated = computed(() => !!token.value);

	const greeting = computed(() => {
		return user.value ? `Привет, ${user.value.name}!` : 'Привет, гость!';
	});

	// Короткие алиасы для получения данных из стора
	const userRole = computed(() => user.value?.role);
	const userId = computed(() => user.value?.id);
	const currentToken = computed(() => token.value);

	// Actions
	//==============LOGIN===============

	const login = async (authData: LoginRequest): Promise<void> => {
		isLoading.value = true;
		error.value = null;
		validationErrors.value = null;
		try {
			const response = await UserService.login(authData);
			user.value = response.user;
			token.value = response.token;
			//Добавить запись токена в заголовки axios

			saveDataToLocalStorage();
		} catch (e: any) {
			const apiError = e as ApiError;

			error.value = apiError.message || 'Ошибка авторизации';
			if (apiError.errors) {
				validationErrors.value = apiError.errors;
			}
			throw e;
		} finally {
			isLoading.value = false;
		}
	};

	//===========LOGOUT==================

	const logout = () => {
		clearAuth();
	};
	//===========REGISTRATION==================

	const registration = async (regData: RegisterRequest): Promise<void> => {
		isLoading.value = true;
		error.value = null;
		validationErrors.value = null;
		try {
			const response = await UserService.registration(regData);
			user.value = response.user;
			token.value = response.token;
			saveDataToLocalStorage();
		} catch (e: any) {
			const apiError = e as ApiError;

			error.value = apiError.message || 'Ошибка регистрации';
			if (apiError.errors) {
				validationErrors.value = apiError.errors;
			}
			throw e;
		} finally {
			isLoading.value = false;
		}
	};

	//===========HELPERS==================

	// Загрузка профиля пользователя по токену
	const fetchUserProfile = async (): Promise<void> => {
		const tokenFromLs = localStorage.getItem('token');
		if (!tokenFromLs) return;
		try {
			//Метод для получения данных по токену
			//Этот метод лучше допилить, нет возможности проверки тухлого токен,
			//но т к у нас токен изначально тестовый (бед даты) пока так
			const response = await UserService.getProfile();
			user.value = response.user;
			token.value = localStorage.getItem('token');
		} catch (e) {
			console.error('Ошибка загрузки профиля:', e);
		}
	};
	//Главаня инициализация при старте стора

	const init = async (): Promise<void> => {
		if (isInitialized.value) return;
		isLoading.value = true;
		try {
			if (!user.value) {
				await fetchUserProfile();
			}
		} catch (e) {
			console.error('Ошибка загрузки профиля:', e);
		} finally {
			isLoading.value = false;
			isInitialized.value = true;
		}
	};
	const clearError = () => {
		error.value = null;
		validationErrors.value = null;
	};
	const clearAuth = () => {
		user.value = null;
		token.value = null;
		error.value = null;
		localStorage.removeItem('token');

		//Добавить очистку заголовков
	};
	const saveDataToLocalStorage = () => {
		//Сохраняем токен в стоража
		if (token.value) {
			localStorage.setItem('token', token.value);
		}
		//Тут можно и пользователя сохранить для быстроты, пока не будем ато Владик заругает
	};
	init();
	return {
		// State
		user,
		token,
		isLoading,
		validationErrors,
		error,

		// Getters
		isAuthenticated,
		greeting,
		userRole,
		userId,
		currentToken,

		// Actions
		login,
		registration,
		clearError,
		logout,
		init,
	};
});
