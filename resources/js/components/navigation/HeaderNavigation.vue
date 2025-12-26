<script setup lang="ts">
	import NavigationElement from '@/components/navigation/NavigationElement.vue';
	import { useAuthStore } from '@/stores/AuthStore.ts';
	import { computed } from 'vue';
	import { getNavigationByRole } from '@/utils/navigation.ts';
	const authStore = useAuthStore();

	const navigationItems = computed(() => {
		return getNavigationByRole(authStore.user?.role || null);
	});
</script>

<template>
	<nav class="nav">
		<ul class="flex items-center gap-8">
			<NavigationElement
				v-for="nav in navigationItems"
				:href="nav.href"
				:title="nav.title"
				:key="nav.href"
				:icon="nav.icon"
				:icon-position="nav.iconPosition"
			/>
		</ul>
	</nav>
</template>

<style scoped></style>
