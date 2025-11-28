<script setup lang="ts">
	import Logo from '@/components/ui/Logo.vue';
	import Container from '@/components/layout/Container.vue';
	import HeaderNavigation from '@/components/navigation/HeaderNavigation.vue';
</script>

<template>
	<header class="py-4">
		<Container>
			<div class="flex justify-between items-center">
				<router-link
					to="/"
					class="block max-w-max"
				>
					<Logo />
				</router-link>
				<HeaderNavigation />
			</div>
		</Container>
	</header>
</template>

<style scoped></style>
