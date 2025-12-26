<script setup lang="ts">
	import Header from '@/components/layout/Header.vue';
	import Footer from '@/components/layout/Footer.vue';
</script>

<template>
	<div class="app-layout">
		<Header />
		<main>
			<router-view />
		</main>
		<Footer />
	</div>
</template>

<style scoped></style>
