<script setup lang="ts">
	import { useField } from 'vee-validate';

	const { value: maxGuestsValue, errorMessage: maxGuestsError } =
		useField<string>('maxGuests');
	const { value: priceValue, errorMessage: priceError } =
		useField<string>('price');
</script>

<template>
	<div>
		<label
			for="maxGuests"
			class="block text-sm font-medium text-gray-700 mb-1"
		>
			Максимально гостей
			<span class="text-red-500">*</span>
		</label>
		<input
			id="maxGuests"
			v-model="maxGuestsValue"
			type="number"
			class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
			placeholder="Введите название площадки"
		/>
		<p
			v-if="maxGuestsError"
			class="mt-1 text-sm text-red-600"
		>
			{{ maxGuestsError }}
		</p>
	</div>
	<div>
		<label
			for="price"
			class="block text-sm font-medium text-gray-700 mb-1"
		>
			Цена
			<span class="text-red-500">*</span>
		</label>
		<input
			id="price"
			v-model="priceValue"
			type="number"
			class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
			placeholder="Введите название площадки"
		/>
		<p
			v-if="priceError"
			class="mt-1 text-sm text-red-600"
		>
			{{ priceError }}
		</p>
	</div>
</template>

<style scoped></style>
