<template>
	<div class="space-y-4">
		<!-- Заголовок и информация -->
		<div class="flex items-center justify-between">
			<p class="block text-sm font-medium text-gray-700">
				Изображения площадки
				<span class="text-red-500">*</span>
			</p>
			<span class="text-sm text-gray-500">
				{{ imagesValue.length }}/5 (минимум 3)
			</span>
		</div>

		<div class="flex gap-7">
			<div class="flex-flex-col lg:max-w-1/2 grow">
				<!-- Поле drag & drop -->
				<div
					v-if="imagesValue.length < 5"
					@dragover="handleDragOver"
					@dragleave="handleDragLeave"
					@drop="handleDrop"
					@click="triggerFileInput"
					:class="[
						'flex justify-center px-6 pt-5 pb-6 border-2 rounded-md transition-all duration-200 cursor-pointer',
						isDragging
							? 'border-blue-500 bg-blue-50 border-solid'
							: 'border-gray-300 border-dashed bg-gray-50 hover:bg-gray-100',
					]"
				>
					<div class="space-y-3 text-center">
						<div class="flex justify-center">
							<div
								:class="[
									'p-3 rounded-full',
									isDragging ? 'bg-blue-100' : 'bg-gray-100',
								]"
							>
								<Upload
									:class="[
										'h-8 w-8',
										isDragging
											? 'text-blue-500'
											: 'text-gray-400',
									]"
								/>
							</div>
						</div>

						<div class="space-y-1">
							<div class="flex justify-center text-sm">
								<span class="font-medium text-blue-600">
									Нажмите для загрузки
								</span>
								<p class="pl-1">или перетащите файлы сюда</p>
							</div>
							<p class="text-xs text-gray-500">
								Поддерживаются только JPEG/JPG до 10MB каждое
							</p>
							<p class="text-xs text-gray-500">
								Требуется от 3 до 5 изображений
							</p>
						</div>

						<!-- Индикатор перетаскивания -->
						<div
							v-if="isDragging"
							class="pt-2"
						>
							<p class="text-sm text-blue-600 font-medium">
								Отпустите файлы для загрузки
							</p>
						</div>
					</div>
				</div>

				<!-- Скрытый input для загрузки файлов -->
				<input
					type="file"
					multiple
					accept=".jpg,.jpeg,image/jpeg"
					@change="handleFileSelect"
					class="sr-only"
					ref="fileInputRef"
				/>

				<!-- Ошибки vee-validate -->
				<div
					v-if="imagesError"
					class="mt-2"
				>
					<div
						class="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded"
					>
						<AlertCircle class="w-4 h-4 shrink-0" />
						<span>{{ imagesError }}</span>
					</div>
				</div>

				<!-- Preview слайдер -->
				<div
					v-if="previewUrls.length > 0"
					class="mt-6"
				>
					<p class="text-sm font-medium text-gray-700 mb-4">
						Загруженные изображения ({{ imagesValue.length }})
					</p>

					<!-- Основной слайдер -->
					<div
						class="relative overflow-hidden rounded-lg bg-gray-100 shadow"
					>
						<div class="relative h-80">
							<div
								v-if="previewUrls[currentSlide]"
								class="w-full h-full flex items-center justify-center"
							>
								<img
									:src="previewUrls[currentSlide]"
									:alt="`Изображение ${currentSlide + 1}`"
									class="max-w-full max-h-full object-contain"
								/>
							</div>

							<!-- Кнопки навигации -->
							<button
								v-if="previewUrls.length > 1"
								@click.stop="prevSlide"
								type="button"
								class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
								aria-label="Предыдущее изображение"
							>
								←
							</button>
							<button
								v-if="previewUrls.length > 1"
								@click.stop="nextSlide"
								type="button"
								class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
								aria-label="Следующее изображение"
							>
								→
							</button>

							<!-- Номер слайда -->
							<div
								class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full"
							>
								{{ currentSlide + 1 }} /
								{{ previewUrls.length }}
							</div>

							<!-- Индикатор обложки -->
							<div
								v-if="selectedCoverIndex === currentSlide"
								class="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow"
							>
								<Check class="w-3 h-3" />
								Обложка
							</div>
						</div>

						<!-- Кнопки управления -->
						<div class="absolute bottom-4 right-4 flex gap-2">
							<button
								v-if="selectedCoverIndex !== currentSlide"
								@click.stop="setAsCover(currentSlide)"
								type="button"
								class="flex items-center gap-2 bg-black/80 hover:bg-black text-white text-sm px-4 py-2 rounded-lg transition-all hover:scale-105 shadow"
							>
								<Check class="w-4 h-4" />
								Сделать обложкой
							</button>
							<button
								@click.stop="removeImage(currentSlide)"
								type="button"
								class="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition-all hover:scale-105 shadow"
							>
								<X class="w-4 h-4" />
								Удалить
							</button>
						</div>
					</div>

					<!-- Миниатюры -->
					<div class="mt-6">
						<p class="text-sm font-medium text-gray-700 mb-3">
							Миниатюры:
						</p>
						<div class="flex gap-3 overflow-x-auto pb-4 px-1">
							<div
								v-for="(url, index) in previewUrls"
								:key="index"
								:class="[
									'relative shrink-0 w-24 h-24 rounded-lg border-2 cursor-pointer overflow-hidden transition-all duration-200',
									currentSlide === index
										? 'border-blue-500 ring-2 ring-blue-200 scale-105'
										: 'border-gray-300 hover:border-gray-400',
									selectedCoverIndex === index
										? 'ring-2 ring-green-500 ring-offset-1'
										: '',
								]"
								@click="goToSlide(index)"
							>
								<img
									:src="url"
									:alt="`Миниатюра ${index + 1}`"
									class="w-full h-full object-cover"
								/>

								<!-- Индикатор обложки -->
								<div
									v-if="selectedCoverIndex === index"
									class="absolute top-0 left-0 bg-green-500 text-white text-[10px] px-2 py-1 rounded-br-lg flex items-center gap-1"
								>
									<Check class="w-2 h-2" />
									<span>Обложка</span>
								</div>

								<!-- Номер изображения -->
								<div
									class="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded-tl"
								>
									{{ index + 1 }}
								</div>

								<!-- Кнопка удаления на миниатюре -->
								<button
									@click.stop="removeImage(index)"
									type="button"
									class="absolute bottom-0 left-0 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-transform hover:scale-110"
									aria-label="Удалить изображение"
								>
									<X class="w-3 h-3" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="max-h-max grow justify-items-center">
				<ImageUploadRules />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// Обновляем preview при изменении значения
	import { onUnmounted, ref, watch } from 'vue';
	import { AlertCircle, Check, Upload, X } from 'lucide-vue-next';
	import { useField } from 'vee-validate';
	import ImageUploadRules from '@/components/allerts/ImageUploadRules.vue';

	// Используем vee-validate для поля images
	const { value: imagesValue, errorMessage: imagesError } = useField<File[]>(
		'images',
		{}
	);

	// Локальное состояние для UI
	const selectedCoverIndex = ref<number | null>(null);
	const previewUrls = ref<string[]>([]);
	const isDragging = ref(false);
	const fileInputRef = ref<HTMLInputElement>();
	const currentSlide = ref(0);

	// Вспомогательные функции для создания preview
	const createPreviewUrls = (files: File[]) => {
		// Очищаем старые URL
		previewUrls.value.forEach((url) => {
			if (url && url.startsWith('blob:')) {
				URL.revokeObjectURL(url);
			}
		});

		// Создаем новые URL
		previewUrls.value = files.map((file) => URL.createObjectURL(file));
	};

	watch(
		imagesValue,
		(newFiles) => {
			if (newFiles && newFiles.length > 0) {
				createPreviewUrls(newFiles);
				// Если это первое изображение, делаем его обложкой
				if (selectedCoverIndex.value === null && newFiles.length > 0) {
					selectedCoverIndex.value = 0;
				}
			} else {
				previewUrls.value = [];
				selectedCoverIndex.value = null;
				currentSlide.value = 0;
			}
		},
		{ immediate: true, deep: true }
	);

	// Валидация файлов перед добавлением
	const validateImageFormat = (file: File): boolean => {
		const allowedTypes = ['image/jpeg'];
		const extension = file.name.split('.').pop()?.toLowerCase();
		const isJPEG =
			allowedTypes.includes(file.type) ||
			extension === 'jpeg' ||
			extension === 'jpg';

		if (!isJPEG) {
			// Можно показать всплывашку
			console.error(
				`Файл "${file.name}" не является JPEG/JPG изображением`
			);
			return false;
		}
		return true;
	};

	const validateImageSize = (file: File): boolean => {
		const maxSizeMB = 10;
		const maxSizeBytes = maxSizeMB * 1024 * 1024;
		if (file.size > maxSizeBytes) {
			console.error(`Файл "${file.name}" превышает ${maxSizeMB}MB`);
			return false;
		}
		return true;
	};

	// Обработка выбранных файлов
	const processFiles = (files: File[]) => {
		// Фильтруем валидные файлы
		const validFiles = files.filter((file) => {
			return validateImageFormat(file) && validateImageSize(file);
		});

		if (validFiles.length === 0) {
			return;
		}

		// Проверяем лимит (5 изображений максимум)
		const totalFiles = [...imagesValue.value, ...validFiles];

		if (totalFiles.length > 5) {
			// vee-validate покажет ошибку из схемы валидации
			// Но мы все равно ограничиваем на уровне UI
			alert(`Максимум можно загрузить 5 изображений`);
			return;
		}

		// Обновляем значение поля (vee-validate автоматически запустит валидацию)
		imagesValue.value = totalFiles;
	};

	// Обработка выбора файлов
	const handleFileSelect = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const files = Array.from(input.files || []);

		if (files.length === 0) {
			return;
		}

		processFiles(files);

		// Очищаем значение input
		if (input) {
			input.value = '';
		}
	};

	// Drag & Drop обработчики
	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		isDragging.value = true;
	};

	const handleDragLeave = (event: DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		isDragging.value = false;
	};

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		isDragging.value = false;

		const files = Array.from(event.dataTransfer?.files || []);
		if (files.length > 0) {
			processFiles(files);
		}
	};

	// Открыть загрузку файлов
	const triggerFileInput = () => {
		if (fileInputRef.value) {
			fileInputRef.value.value = '';
			fileInputRef.value.click();
		}
	};

	// Удаление изображения
	const removeImage = (index: number) => {
		// Отзываем URL объекта
		if (
			previewUrls.value[index] &&
			previewUrls.value[index].startsWith('blob:')
		) {
			URL.revokeObjectURL(previewUrls.value[index]);
		}

		// Удаляем изображение из массива
		const newImages = [...imagesValue.value];
		newImages.splice(index, 1);

		// Удаляем preview URL из массива
		previewUrls.value.splice(index, 1);

		// Корректируем currentSlide если нужно
		if (currentSlide.value === index) {
			if (currentSlide.value > 0) {
				currentSlide.value--;
			} else if (newImages.length > 0) {
				currentSlide.value = 0;
			}
		}

		if (currentSlide.value >= newImages.length && newImages.length > 0) {
			currentSlide.value = newImages.length - 1;
		}

		// Корректируем индекс обложки
		if (selectedCoverIndex.value === index) {
			selectedCoverIndex.value =
				newImages.length > 0
					? Math.min(index, newImages.length - 1)
					: null;
		} else if (
			selectedCoverIndex.value !== null &&
			selectedCoverIndex.value > index
		) {
			selectedCoverIndex.value--;
		}

		// Обновляем значение поля
		imagesValue.value = newImages;
	};

	// Установка обложки
	const setAsCover = (index: number) => {
		selectedCoverIndex.value = index;
	};

	// Слайдер
	const nextSlide = () => {
		if (previewUrls.value.length === 0) return;
		currentSlide.value =
			(currentSlide.value + 1) % previewUrls.value.length;
	};

	const prevSlide = () => {
		if (previewUrls.value.length === 0) return;
		currentSlide.value =
			(currentSlide.value - 1 + previewUrls.value.length) %
			previewUrls.value.length;
	};

	const goToSlide = (index: number) => {
		if (index >= 0 && index < previewUrls.value.length) {
			currentSlide.value = index;
		}
	};

	// Очистка при уничтожении компонента
	onUnmounted(() => {
		previewUrls.value.forEach((url) => {
			if (url && url.startsWith('blob:')) {
				URL.revokeObjectURL(url);
			}
		});
	});

	// Методы для родительского компонента
	defineExpose({
		getCoverIndex: () => selectedCoverIndex.value,
		getCoverImage: () => {
			if (
				selectedCoverIndex.value !== null &&
				imagesValue.value.length > selectedCoverIndex.value
			) {
				return imagesValue.value[selectedCoverIndex.value];
			}
			return null;
		},
	});
</script>

<style scoped>
	::-webkit-scrollbar {
		height: 6px;
	}

	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #a1a1a1;
	}
</style>
