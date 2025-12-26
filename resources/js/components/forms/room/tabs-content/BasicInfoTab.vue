<script setup lang="ts">
	import { useField } from 'vee-validate';

	const { value: titleValue, errorMessage: titleError } =
		useField<string>('title');
	const { value: descriptionValue, errorMessage: descriptionError } =
		useField<string>('description');
</script>
<template>
	<div>
		<label
			for="title"
			class="block text-sm font-medium text-gray-700 mb-1"
		>
			Название площадки
			<span class="text-red-500">*</span>
		</label>
		<input
			id="title"
			v-model="titleValue"
			type="text"
			class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
			placeholder="Введите название площадки"
		/>
		<p
			v-if="titleError"
			class="mt-1 text-sm text-red-600"
		>
			{{ titleError }}
		</p>
	</div>
	<div>
		<label
			for="description"
			class="block text-sm font-medium text-gray-700 mb-1"
		>
			Описание площадки
			<span class="text-red-500">*</span>
		</label>
		<textarea
			id="description"
			v-model="descriptionValue"
			class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
			placeholder="Введите описание площадки"
		/>
		<p
			v-if="descriptionError"
			class="mt-1 text-sm text-red-600"
		>
			{{ descriptionError }}
		</p>
	</div>
</template>
