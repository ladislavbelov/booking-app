<script setup lang="ts">
	import { ApiError } from '@/types/auth.ts';
	import { watch } from 'vue';
	import { useAuthStore } from '@/stores/AuthStore.ts';
	import { useRoute } from 'vue-router';
	//Сделал с пропсами, т к далее хочу сделать универсальный обработчик ошибок, с отдельным стором куда буду сливать ошибки по типу
	interface AuthErrorProps {
		error?: ApiError | null;
	}
	defineProps<AuthErrorProps>();

	const authStore = useAuthStore();
	const route = useRoute();
	//Следим за изменением url и чистим error
	watch(
		() => route.fullPath,
		(newPath, oldPath) => {
			if (newPath !== oldPath) {
				authStore.clearError();
			}
		},
		{ immediate: true }
	);
</script>

<template>
	<Transition name="slide-bounce">
		<div
			v-if="authStore.error"
			class="error-box bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm shadow-lg absolute top-5 right-5 z-50 max-w-md"
		>
			{{ authStore.error }}
			<button
				@click="authStore.clearError()"
				class="cursor-pointer text-red-500 hover:text-red-700 font-bold text-[22px]"
			>
				×
			</button>
		</div>
	</Transition>
</template>

<style scoped>
	.error-box {
		position: absolute;
		top: 3%;
		right: 3%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		column-gap: 12px;
	}
	/*Используются VUE*/
	.slide-bounce-enter-active {
		animation: slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.slide-bounce-leave-active {
		animation: slideOutRight 0.3s ease;
	}

	@keyframes slideInRight {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes slideOutRight {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			transform: translateX(100%);
			opacity: 0;
		}
	}
</style>
