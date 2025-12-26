import { Image, Info, UserPen, LucideIcon } from 'lucide-vue-next';
import { UserRole } from '@/types/auth.ts';
import BasicInfoTab from '@/components/forms/room/tabs-content/BasicInfoTab.vue';
import ImagesTab from '@/components/forms/room/tabs-content/ImagesTab.vue';
import GuestsTab from '@/components/forms/room/tabs-content/GuestsTab.vue';

export interface NavLink {
	title: string;
	href: string;
	icon?: LucideIcon;
	iconPosition?: 'left' | 'right';
	roles?: UserRole[]; // если пусто - доступно всем
	children?: NavLink[];
}

// Навигация для неавторизованных пользователей
export const guestNavigation: NavLink[] = [
	{
		title: 'О сервисе',
		href: '/about',
	},
	{
		title: 'Вход',
		href: '/auth/login',
		iconPosition: 'right',
	},
	{
		title: 'Регистрация',
		href: '/auth/register',
		iconPosition: 'right',
	},
];

// Навигация для авторизованных пользователей (get / post /admin)
export const commonUserNavigation: NavLink[] = [
	{
		title: 'О сервисе',
		href: '/about',
	},
];

// Навигация для роли 'get' (снимают)
export const getNavigation: NavLink[] = [
	{
		title: 'Выбрать площадку',
		href: '/get/rooms',
	},
	{
		title: 'Мои брони',
		href: '/get/my-reservations',
	},
	{
		title: 'Профиль',
		href: '/get/profile',
	},

	...commonUserNavigation,
];

// Навигация для роли 'post' (сдают)
export const postNavigation: NavLink[] = [
	{
		title: 'Добавить площадку',
		href: '/post/create',
	},
	{
		title: 'Мои площадки',
		href: '/post/my-rooms',
	},
	{
		title: 'Профиль',
		href: '/post/profile',
	},

	...commonUserNavigation,
];

// Вспомогательная функция для получения навигации по роли
export function getNavigationByRole(role: UserRole | null): NavLink[] {
	switch (role) {
		case 'get':
			return getNavigation;
		case 'post':
			return postNavigation;

		default:
			return guestNavigation;
	}
}

//Табы при создании комнаты
export type TabType = 'basic' | 'images' | 'guests';
export interface TabConfig {
	id: TabType;
	label: string;
	icon?: any;
	component: any;
}
export const tabs: TabConfig[] = [
	{
		id: 'basic',
		label: 'Основная информация',
		icon: Info,
		component: BasicInfoTab,
	},
	{
		id: 'images',
		label: 'Изображения',
		icon: Image,
		component: ImagesTab,
	},
	{
		id: 'guests',
		label: 'Вместимость и цена',
		icon: UserPen,
		component: GuestsTab,
	},
];
