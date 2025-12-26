<script setup lang="ts"></script>

<template>
	<!-- Информация о требованиях к изображениям -->
	<div class="mt-6 p-4 bg-blue-50 rounded-lg">
		<p class="text-sm font-medium text-blue-800 mb-2">
			Требования к изображениям:
		</p>
		<ul class="text-sm text-blue-700 space-y-1">
			<li class="flex items-center gap-2">
				<div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
				Формат: только JPEG/JPG
			</li>
			<li class="flex items-center gap-2">
				<div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
				Количество: от 3 до 5 изображений
			</li>
			<li class="flex items-center gap-2">
				<div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
				Размер: не более 10MB каждое
			</li>
			<li class="flex items-center gap-2">
				<div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
				Первое изображение станет обложкой по умолчанию
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
