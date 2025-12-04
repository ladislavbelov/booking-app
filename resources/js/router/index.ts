import AppLayout from '@/layouts/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginLayout from '@/layouts/LoginLayout.vue';
import RegistrationLayout from '@/layouts/RegistrationLayout.vue';

const routes = [
	{
		path: '/',
		component: AppLayout,
		children: [
			{
				path: '',
				component: () => import('@/views/Home.vue'),
			},
			//Другие компоненты и роуты с этим layout
		],
	},
	{
		path: '/auth',
		children: [
			{
				path: 'login',
				component: LoginLayout,
				children: [
					{
						path: '',
						name: 'login',
						component: () => import('@/views/Login.vue'),
					},
				],
			},
			{
				path: 'register',
				component: RegistrationLayout,
				children: [
					{
						path: '',
						name: 'register',
						component: () => import('@/views/Registration.vue'),
					},
				],
			},
		],
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
