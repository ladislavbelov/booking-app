<script setup lang="ts">
	import { useAuthStore } from '@/stores/AuthStore.ts';

	const user = useAuthStore();
</script>

<template>Home {{ user.greeting }}</template>

<style scoped></style>
