<script setup lang="ts">
	import { useAuthStore } from '@/stores/AuthStore.ts';

	const authStore = useAuthStore();
	const userName = authStore.userName;

	const userRole = authStore.userRole;
</script>

<template>
	Профиль пользователя {{ userName }} <br />Роль пользователя {{ userRole }}
</template>

<style scoped></style>
