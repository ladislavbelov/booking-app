<script setup lang="ts">
	import Welcome from '@/components/layout/Welcome.vue';

	import Footer from '@/components/layout/Footer.vue';
</script>

<template>
	<div class="app-layout">
		<Welcome />
		<main>
			<router-view />
		</main>
		<Footer />
	</div>
</template>

<style scoped></style>
