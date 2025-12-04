<script setup lang="ts">
	import { useField } from 'vee-validate';
	import { computed } from 'vue';

	interface CheckboxProps {
		id: string;
		name: string;
		label?: string;
		checked?: boolean;
		value: 'get' | 'post';
	}

	const props = withDefaults(defineProps<CheckboxProps>(), {
		name: 'role',
		checked: false,
		value: 'get',
	});

	const { value: fieldValue } = useField<string>(props.name, {
		initialValue: 'post',
	});

	const isChecked = computed(() => fieldValue.value === 'get');

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		fieldValue.value = target.checked ? 'get' : 'post';
	};
</script>

<template>
	<div class="flex items-center gap-3">
		<span
			:class="[
				'font-medium transition-colors duration-300',
				isChecked ? 'text-green-500' : 'text-gray-500',
			]"
		>
			Снимать
		</span>
		<label
			:for="id"
			class="switch"
		>
			<input
				type="checkbox"
				:name="name"
				:value="value"
				@change="handleChange"
				:id="id"
				:checked="isChecked"
				class="switch-input"
			/>
			<span class="switch-slider"></span>
		</label>
		<span
			:class="[
				'font-medium transition-colors duration-300',
				!isChecked ? 'text-green-500' : 'text-gray-500',
			]"
		>
			Сдавать
		</span>
	</div>
</template>

<style scoped>
	.switch {
		position: relative;
		display: inline-block;
		width: 52px;
		height: 28px;
	}

	.switch-input {
		opacity: 0;
		width: 0;
		height: 0;
		position: absolute;
	}

	.switch-slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #d1fae5;
		transition: all 0.4s ease-in-out;
		border-radius: 34px;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
	}

	.switch-slider:before {
		position: absolute;
		content: '';
		height: 24px;
		width: 24px;
		left: 2px;
		bottom: 2px;
		background-color: #10b981;
		transition: all 0.4s ease-in-out;
		border-radius: 50%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
	.switch-input + .switch-slider:before {
		transform: translateX(24px);
	}
	.switch-input:checked + .switch-slider {
		background-color: #d1fae5;
	}

	.switch-input:checked + .switch-slider:before {
		transform: translateX(0px);
		background-color: #10b981;
	}

	.switch:hover .switch-slider:before {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
	}

	.switch-input:focus + .switch-slider {
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
	}
</style>
