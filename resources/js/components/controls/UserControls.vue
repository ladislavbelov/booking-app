<script setup lang="ts">
	import { useAuthStore } from '@/stores/AuthStore.ts';
	import Button from '@/components/ui/Button.vue';
	import { LogOut } from 'lucide-vue-next';
	import router from '@/router';

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
	<div
		v-if="authStore.isAuthenticated"
		class="flex items-center gap-9"
	>
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
