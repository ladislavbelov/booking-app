<template>
	<div class="app-layout">
		<Header />
		<main>
			<Container>
				<router-view />
			</Container>
		</main>
		<footer>
			<Container> Здесь какой-то футер </Container>
		</footer>
	</div>
</template>

<script setup lang="ts">
	import Container from '@/components/layout/Container.vue';
	import Header from '@/components/layout/Header.vue';
</script>

<style scoped>
	.app-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}
</style>
