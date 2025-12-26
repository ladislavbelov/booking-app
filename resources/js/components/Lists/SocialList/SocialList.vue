<!-- SocialList.vue -->
<script setup lang="ts">
	import { MessageCircle, Send } from 'lucide-vue-next';
	import type { Component } from 'vue';

	interface SocialItem {
		icon: Component;
		title: string;
		href: string;
		color?: string;
	}

	// список социальных сетей
	const socialList: SocialItem[] = [
		{
			title: 'Telegram',
			href: '#',
			icon: Send,
			color: '#0088cc',
		},
		{
			title: 'Whatsapp',
			href: '#',
			icon: MessageCircle,
			color: '#25D366',
		},
	];

	const iconSize = 25;
	const gap = '1rem';
</script>

<template>
	<ul
		class="social-list"
		:style="{ gap }"
	>
		<li
			v-for="item in socialList"
			:key="item.title"
		>
			<a
				:href="item.href"
				:title="item.title"
				class="social-link"
				target="_blank"
				rel="noopener noreferrer"
				:style="{ '--icon-color': item.color }"
			>
				<component
					:is="item.icon"
					:stroke-width="1.5"
					:width="iconSize"
					:height="iconSize"
					class="social-icon"
				/>
			</a>
		</li>
	</ul>
</template>

<style scoped>
	.social-list {
		display: flex;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border-radius: 50%;
		transition: all 0.3s ease;
		color: currentColor;
	}

	.social-link:hover {
		background-color: rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.social-icon {
		transition: all 0.3s ease;
		color: #e5e5e5;
	}

	.social-link:hover .social-icon {
		transform: scale(1.1);
	}
</style>
