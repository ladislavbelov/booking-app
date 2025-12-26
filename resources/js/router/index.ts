import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('@/layouts/HomeLayout.vue'),
		meta: { requiresAuth: false, guestOnly: true },
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/Home.vue'),
			},

			// Другие публичные маршруты
		],
	},
	{
		path: '/about',
		component: () => import('@/layouts/AppLayout.vue'),
		meta: { requiresAuth: false, guestOnly: false },
		children: [
			{
				path: '',
				name: 'about',
				component: () => import('@/views/About.vue'),
			},

			// Другие публичные маршруты
		],
	},

	{
		path: '/auth',
		component: () => import('@/layouts/AuthLayout.vue'),
		meta: { guestOnly: true },
		children: [
			{
				path: 'login',
				name: 'login',
				component: () => import('@/views/Login.vue'),
			},
			{
				path: 'register',
				name: 'register',
				component: () => import('@/views/Registration.vue'),
			},
		],
	},
	// Маршруты для GETTER (арендатор)
	{
		path: '/get',
		component: () => import('@/layouts/GetLayout.vue'),
		meta: { requiresAuth: true, role: 'get' },
		children: [
			{
				path: '',
				name: 'get-homepage',
				component: () => import('@/views/get/Home.vue'),
			},
			{
				path: 'rooms',
				name: 'get-rooms',
				component: () => import('@/views/get/Rooms.vue'),
			},
			{
				path: 'my-reservations',
				name: 'get-reservations',
				component: () => import('@/views/get/My-reservations.vue'),
			},
			{
				path: 'profile',
				name: 'get-profile',
				component: () => import('@/views/get/Profile.vue'),
			},
		],
	},
	// Маршруты для POSTER (сдающий)
	{
		path: '/post',
		component: () => import('@/layouts/PostLayout.vue'),
		meta: { requiresAuth: true, role: 'post' },
		children: [
			{
				path: 'dashboard',
				name: 'post-dashboard',
				component: () => import('@/views/post/Dashboard.vue'),
			},

			{
				path: 'create',
				name: 'post-create',
				component: () => import('@/views/post/Create.vue'),
			},
			{
				path: 'my-rooms',
				name: 'post-my-rooms',
				component: () => import('@/views/post/My-rooms.vue'),
			},
			{
				path: 'profile',
				name: 'post-profile',
				component: () => import('@/views/post/Profile.vue'),
			},
		],
	},
	// Маршруты для SUPER ADMIN
	{
		path: '/admin',
		component: () => import('@/layouts/AdminLayout.vue'),
		meta: { requiresAuth: true, role: 'superadmin' },
		children: [
			{
				path: 'dashboard',
				name: 'admin-dashboard',
				component: () => import('@/views/admin/Dashboard.vue'),
			},
			// ... другие админские маршруты
		],
	},
	// Страница "Доступ запрещен"
	{
		path: '/unauthorized',
		name: 'unauthorized',
		component: () => import('@/views/Unauthorized.vue'),
	},
	// 404 страница
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('@/views/NotFound.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Глобальные guards
router.beforeEach(async (to, _, next) => {
	const authStore = useAuthStore();

	// Если стор еще не инициализирован, инициализируем его
	if (!authStore.isInitialized) {
		await authStore.init();
	}

	const isAuthenticated = authStore.isAuthenticated;
	const userRole = authStore.user?.role;

	console.log('Navigation guard:', {
		to: to.path,
		isAuthenticated,
		userRole,
		requiresAuth: to.meta.requiresAuth,
		requiredRole: to.meta.role,
	});

	// Проверка на guestOnly маршруты (только для неавторизованных)
	if (to.meta.guestOnly && isAuthenticated) {
		console.log('Guest only route accessed by authenticated user');
		// Редирект в зависимости от роли
		switch (userRole) {
			case 'get':
				next('/get');
				break;
			case 'post':
				next('/post/dashboard');
				break;
			case 'superadmin':
				next('/admin/dashboard');
				break;
			default:
				next('/');
		}
		return;
	}

	// Проверка на требование авторизации
	if (to.meta.requiresAuth && !isAuthenticated) {
		console.log('Auth required but user not authenticated');
		next('/auth/login');
		return;
	}

	// Проверка роли (только для авторизованных пользователей)
	if (to.meta.requiresAuth && to.meta.role && userRole !== to.meta.role) {
		console.log(
			`Role mismatch: user has ${userRole}, required ${to.meta.role}`
		);
		next('/unauthorized');
		return;
	}

	console.log('Navigation allowed');
	next();
});

export default router;
