<!--Есть размеры по дефолты, свои размеры передаем пропсами-->
<script setup lang="ts">
	import { computed } from 'vue';

	interface LogoProps {
		width?: string;
		height?: string;
		logoType?: 'light' | 'dark';
	}
	const props = withDefaults(defineProps<LogoProps>(), {
		width: '200',
		height: '48',
		logoType: 'light',
	});
	const logoPath = computed(() => {
		switch (props.logoType) {
			case 'dark':
				return '/images/logo-dark.svg';
			case 'light':
			default:
				return '/images/logo.svg';
		}
	});
</script>

<template>
	<img
		:src="logoPath"
		alt="Логотип"
		:width="width"
		:height="height"
		loading="lazy"
		decoding="async"
	/>
</template>

<style scoped></style>
