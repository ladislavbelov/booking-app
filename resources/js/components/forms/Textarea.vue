<script setup lang="ts">
	import { generateId } from '@/utils/helpers.ts';
	import { useField } from 'vee-validate';
	import { computed } from 'vue';

	interface TextareaProps {
		id?: string;
		label?: string;
		placeholder?: string;
		required?: boolean;
		name: string;
		rows?: number;
		maxlength?: number;
	}

	const props = withDefaults(defineProps<TextareaProps>(), {
		id: '',
		label: '',
		placeholder: '',
		required: false,
		rows: 4,
	});

	const inputId = computed(() => props.id || generateId(9));
	const { value, errorMessage } = useField<string>(() => props.name);
</script>

<template>
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
			>
				*
			</span>
		</label>
		<textarea
			:id="inputId"
			:required="required"
			:placeholder="placeholder"
			:rows="rows"
			:maxlength="maxlength"
			v-model="value"
			class="h-[220px] resize-none border border-gray-300 rounded-md px-3 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6f6f6f] focus:border-transparent overflow-y-auto"
			:class="{
				'border-red-500 ring-1 ring-red-200': errorMessage,
			}"
			:name="name"
		/>
		<div
			v-if="maxlength"
			class="text-xs text-gray-400 text-right mt-1"
		>
			{{ value?.length || 0 }} / {{ maxlength }}
		</div>
	</div>
</template>
