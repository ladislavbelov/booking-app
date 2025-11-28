<script setup lang="ts">
	import NavigationElement, {
		NavLinkProps,
	} from '@/components/navigation/NavigationElement.vue';

	const navList: NavLinkProps[] = [
		{
			title: 'Главная',
			href: '/',
			iconPosition: 'left',
		},
		{
			title: 'Вход',
			href: '/auth/login',
			iconPosition: 'right',
		},
		{
			title: 'Регистрация',
			href: '/auth/register',
			iconPosition: 'right',
		},
	];
</script>

<template>
	<ul class="flex items-center gap-8">
		<NavigationElement
			v-for="nav in navList"
			:href="nav.href"
			:title="nav.title"
			:key="nav.href"
			:icon="nav.icon"
			:icon-position="nav.iconPosition"
		/>
	</ul>
</template>

<style scoped></style>
