<script setup lang="ts">
	import { generateId } from '@/utils/helpers.ts';
	import { useField } from 'vee-validate';
	import { computed } from 'vue';

	interface InputProps {
		inputType: 'email' | 'password' | 'text' | 'number';
		id?: string;
		label?: string;
		placeholder?: string;
		required?: boolean;
		autocomplete?: string;
		name: string;
	}

	const props = withDefaults(defineProps<InputProps>(), {
		inputType: 'text',
		id: '',
		label: '',
		placeholder: '',
		required: false,
		autocomplete: 'off',
	});

	const inputId = computed(() => props.id || generateId(9));

	const { value, errorMessage } = useField<string>(() => props.name);
</script>

<template>
	<!--Универсальный компонент инпута, при использовании ОБЯЗАТЕЛЬНО указывать тип-->
	<!--нужного инпута 'email' | 'password' | 'text' | 'number', передавать обязателен-->
	<!--ли он, в виде :required="true / false", указать поле для отправки name='нужное-->
	<!--имя из типа'-->
	<div class="flex flex-col gap-1.5">
		<label
			v-if="label"
			:for="inputId"
			class="text-[14px] text-gray-500 flex justify-between items-center"
		>
			{{ label }}
			<span
				v-if="errorMessage"
				class="text-red-500 text-sm"
			>
				{{ errorMessage }}
			</span>
			<span
				v-if="required"
				class="text-red-500"
				>*</span
			>
		</label>
		<input
			:type="inputType"
			:id="inputId"
			:required="required"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			v-model="value"
			:class="[
				'border border-gray-300 rounded-md px-3 py-2 transition-colors duration-200',
				'focus:outline-none focus:ring-2 focus:ring-[#6f6f6f] focus:border-transparent',
				{ 'border-red-500 ring-1 ring-red-200': errorMessage },
			]"
			:name="name"
		/>
	</div>
</template>
