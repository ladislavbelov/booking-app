<script setup lang="ts">
	import { computed, useAttrs } from 'vue';

	interface ButtonProps {
		type?: 'reset' | 'submit' | 'button';
		disabled?: boolean;
		loading?: boolean;
	}

	const props = withDefaults(defineProps<ButtonProps>(), {
		type: 'button',
		disabled: false,
		loading: false,
	});

	const emit = defineEmits<{
		click: [event: UIEvent];
	}>();

	const attrs = useAttrs();

	const handleClick = (event: MouseEvent) => {
		if (props.disabled || props.loading) {
			event.preventDefault();
			return;
		}

		emit('click', event);
	};

	const buttonClasses = computed(() => ({
		button: true,
		'button--disabled': props.disabled,
		'button--loading': props.loading,
	}));
</script>

<template>
	<button
		:type="type"
		:disabled="disabled || loading"
		:class="buttonClasses"
		v-bind="attrs"
		@click="handleClick"
	>
		<span
			v-if="loading"
			class="button__loader"
			aria-hidden="true"
		/>
		<slot v-else />
	</button>
</template>

<style scoped>
	.button {
		cursor: pointer;
		position: relative;
		transition: opacity 0.2s ease;
	}

	.button--disabled,
	.button:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	.button--loading {
		color: transparent;
	}

	.button__loader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 16px;
		height: 16px;
		border: 2px solid currentColor;
		border-top-color: transparent;
		border-radius: 50%;
		animation: button-spin 0.8s linear infinite;
	}

	@keyframes button-spin {
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
</style>
