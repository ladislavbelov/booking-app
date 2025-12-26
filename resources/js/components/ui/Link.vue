<script setup lang="ts">
	interface LinkProps {
		dest: string;
		linkText?: string;
		colorVariant?: 'colored' | 'gray' | 'outlined';
	}

	withDefaults(defineProps<LinkProps>(), {
		linkText: '',
		colorVariant: 'colored',
	});
</script>

<template>
	<router-link
		:to="dest"
		:class="['link', `link--${colorVariant}`]"
	>
		<span class="link__text">{{ linkText }}</span>
	</router-link>
</template>

<style scoped>
	.link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 10px 28px;
		border-radius: 45px;
		text-decoration: none;
		transition: all 0.3s ease;
		cursor: pointer;
		outline: none;
		max-width: max-content;
	}

	.link:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.link:active {
		transform: translateY(0);
	}

	.link--colored {
		background: var(--color-primary-orange);
		color: #000;
	}

	.link--gray {
		background: #515669;
		color: #fff;
	}

	.link--gray:hover {
		background: #404353;
	}

	.link--outlined {
		background: transparent;
		color: #000;

		border: 1px solid var(--color-primary-orange);
		span {
			color: #474747;
			font-weight: 500;
		}
	}

	.link--outlined:hover {
		background: var(--color-primary-orange);
		border-color: transparent;
		span {
			color: #fff;
		}
	}

	.link__text {
		display: inline-block;
		white-space: nowrap;
		color: white;
		font-weight: 400;
		font-size: 16px;
	}
</style>
