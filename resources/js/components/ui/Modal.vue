<script setup lang="ts">
	import { computed, onMounted, onUnmounted } from 'vue';
	import { Check, CircleX } from 'lucide-vue-next';

	interface Props {
		modelValue: boolean;
		title?: string;
		closeOnOverlay?: boolean;
	}

	const props = withDefaults(defineProps<Props>(), {
		closeOnOverlay: true,
	});

	const emit = defineEmits<{
		'update:modelValue': [value: boolean];
		close: [];
	}>();

	const isOpen = computed(() => props.modelValue);

	function close() {
		emit('update:modelValue', false);
		emit('close');
	}

	onMounted(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen.value) close();
		};

		window.addEventListener('keydown', handleEsc);
		onUnmounted(() => window.removeEventListener('keydown', handleEsc));
	});
</script>
<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				v-if="isOpen"
				class="modal-overlay"
				@click="closeOnOverlay && close()"
			>
				<div
					class="modal-content relative"
					@click.stop
				>
					<button
						@click="close"
						class="cursor-pointer close-btn"
					>
						<CircleX />
					</button>
					<slot name="header ">
						<div class="modal-header flex flex-col gap-5">
							<div
								class="rounded-full bg-[#67CA63] w-[68px] h-[68px] flex items-center justify-center"
							>
								<Check
									class="w-[60%] h-[60%]"
									color="white"
								/>
							</div>
							<h3 class="font-bold text-[22px]">{{ title }}</h3>
						</div>
					</slot>

					<div class="modal-body">
						<slot></slot>
					</div>

					<slot name="footer">
						<!--						Тут доделать по слотам-->
						<div
							class="modal-footer flex flex-col md:flex-row justify-center gap-[20px] py-[20px]"
						>
							<router-link
								class="modal-link text-center"
								to="/"
								>Главная страница</router-link
							>
							<router-link
								class="modal-link text-center"
								to="/"
								>Личный кабинет</router-link
							>
						</div>
					</slot>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		backdrop-filter: blur(3px);
	}

	.modal-content {
		background: white;
		border-radius: 8px;
		padding: 20px;
		max-width: 500px;
		width: 90%;
		max-height: 90vh;
		overflow-y: auto;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}
	.close-btn {
		transition: 0.3s ease-in-out;
		position: absolute;
		top: 20px;
		right: 20px;
	}
	.close-btn:hover {
		transform: rotate(45deg);
	}
	.modal-link {
		border-radius: 12px;
		background-color: #ff135c;
		padding: 10px;
		display: block;
		color: white;
		font-size: 16px;
		font-weight: 500;
	}
	/* Анимации */
	.modal-enter-active,
	.modal-leave-active {
		transition: opacity 0.3s ease;
	}

	.modal-enter-from,
	.modal-leave-to {
		opacity: 0;
	}

	.modal-content-enter-active,
	.modal-content-leave-active {
		transition: all 0.3s ease;
	}

	.modal-content-enter-from {
		opacity: 0;
		transform: translateY(-20px) scale(0.95);
	}

	.modal-content-leave-to {
		opacity: 0;
		transform: translateY(20px) scale(0.95);
	}
</style>
