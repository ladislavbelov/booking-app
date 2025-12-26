<script setup lang="ts">
	import Logo from '@/components/ui/Logo.vue';
	import Container from '@/components/layout/Container.vue';
	import HeaderNavigation from '@/components/navigation/HeaderNavigation.vue';
	import UserControls from '@/components/controls/UserControls.vue';

	interface HeaderProps {
		colorVariant?: 'colored' | 'default';
	}
	withDefaults(defineProps<HeaderProps>(), {
		colorVariant: 'default',
	});
</script>

<template>
	<header :class="['header', `header-${colorVariant}`]">
		<Container>
			<div class="flex justify-between items-center">
				<router-link
					to="/"
					class="block max-w-max"
				>
					<Logo
						width="165"
						height="49"
					/>
				</router-link>
				<div class="flex gap-9 items-center">
					<HeaderNavigation />
					<UserControls />
				</div>
			</div>
		</Container>
	</header>
</template>

<style scoped>
	.header {
		height: 100px;
		display: flex;
		align-items: center;
	}
	.header-default {
		background-color: #474747;
	}
	.header-colored {
		background-color: #4747478a;
	}
</style>
