<!--Есть размеры по дефолты, свои размеры передаем пропсами-->
<script setup lang="ts">
	interface LogoProps {
		width?: number;
		height?: number;
	}
	withDefaults(defineProps<LogoProps>(), {
		width: 200,
		height: 48,
	});
</script>

<template>
	<img
		src="/images/logo.svg"
		alt="Логотип"
		:width="width"
		:height="height"
		loading="lazy"
		decoding="async"
	/>
</template>

<style scoped></style>
