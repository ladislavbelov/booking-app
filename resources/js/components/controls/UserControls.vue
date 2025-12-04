<script setup lang="ts">
	import NavigationElement, {
		NavLinkProps,
	} from '@/components/navigation/NavigationElement.vue';
	import { useAuthStore } from '@/stores/AuthStore.ts';
	import Button from '@/components/ui/Button.vue';
	import { LogOut } from 'lucide-vue-next';
	import router from '@/router';

	const navList: NavLinkProps[] = [
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
	const authStore = useAuthStore();
	const handleLogout = async () => {
		try {
			authStore.logout();
			// Перенаправляем на главную после выхода или на три буквы
			await router.push('/');
		} catch (error) {
			console.error('Ошибка при выходе:', error);
		}
	};
</script>

<template>
	<ul
		v-if="!authStore.isAuthenticated"
		class="flex items-center gap-8"
	>
		<NavigationElement
			v-for="nav in navList"
			:href="nav.href"
			:title="nav.title"
			:key="nav.href"
			:icon="nav.icon"
			:icon-position="nav.iconPosition"
		/>
	</ul>
	<div
		v-if="authStore.isAuthenticated"
		class="flex items-center gap-9"
	>
		<span class="block">{{ authStore.greeting }}</span>
		<Button
			v-if="authStore.isAuthenticated"
			type="button"
			@click="handleLogout"
			:disabled="authStore.isLoading"
		>
			<LogOut />
		</Button>
	</div>
</template>

<style scoped></style>
