<script setup lang="ts">
	import { NavLink } from '@/utils/navigation.ts';

	withDefaults(defineProps<NavLink>(), {
		iconPosition: 'left',
	});
</script>

<template>
	<li>
		<router-link
			:to="href"
			class="flex items-center gap-2 text-white nav-link"
			exact-active-class="text-[#ff4a4a]"
		>
			<component
				v-if="icon && iconPosition === 'left'"
				:is="icon"
				class="w-4 h-4"
			/>
			<span>{{ title }}</span>
			<component
				v-if="icon && iconPosition === 'right'"
				:is="icon"
				class="w-4 h-4"
			/>
		</router-link>
	</li>
</template>

<style scoped>
	.nav-link {
		position: relative;
		overflow: hidden;
		padding-bottom: 2px;

		&:after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 2px;
			background-color: var(--color-primary-orange);
			transform: translateX(-100%);
			transition: transform 0.3s ease;
		}

		&:hover:after {
			transform: translateX(0);
		}

		&.active:after {
			transform: translateX(0);
		}
	}
</style>
