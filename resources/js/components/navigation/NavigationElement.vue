<script setup lang="ts">
	import { LucideIcon } from 'lucide-vue-next';

	export interface NavLinkProps {
		title: string;
		href: string;
		icon?: LucideIcon;
		iconPosition?: 'left' | 'right';
	}
	withDefaults(defineProps<NavLinkProps>(), {
		iconPosition: 'left',
	});
</script>

<template>
	<li>
		<router-link
			:to="href"
			class="flex items-center gap-2"
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

<style scoped></style>
