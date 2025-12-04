import axios from 'axios';

const instance = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	withCredentials: true,
});

// Интерсептор для добавления токена
instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Интерсептор для обработки ошибок авторизации
instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Токен истек или недействителен
			localStorage.removeItem('token');
			// Можно вызвать метод logout из store
			// или выполнить редирект
		}
		return Promise.reject(error);
	}
);

export default instance;
