<script setup lang="ts">
	import Section from '@/components/layout/Section.vue';
	import { tabs, TabType } from '@/utils/navigation.ts';
	import { computed, ref, shallowRef } from 'vue';
	import TabElement from '@/components/forms/room/tabs/TabElement.vue';
	import BasicInfoTab from '@/components/forms/room/tabs-content/BasicInfoTab.vue';
	import { useForm } from 'vee-validate';
	import { RoomFormValues } from '@/types/rooms.ts';
	import { toTypedSchema } from '@vee-validate/yup';
	import {
		createRoomValidationSchema,
		VALIDATION_CONSTANTS,
	} from '@/utils/formsValidation.ts';
	import GuestsTab from '@/components/forms/room/tabs-content/GuestsTab.vue';
	import ImagesTab from '@/components/forms/room/tabs-content/ImagesTab.vue';

	//---Активный таб и компонент по умолчанию
	const activeTab = ref<TabType>('basic');
	const activeComponent = shallowRef(tabs[0].component);

	//---При переключении таба меняем компонент.Функция переключения табов.
	const handleTabChange = (tabId: TabType) => {
		activeTab.value = tabId;
		const tab = tabs.find((t) => t.id === tabId);
		if (tab) {
			activeComponent.value = tab.component;
		}
	};

	//---Ref для компонента ImagesTab
	const imagesTabRef = ref<InstanceType<typeof ImagesTab>>();

	//---Настройка формы vee-validate
	const { handleSubmit, values, errors, meta } = useForm<RoomFormValues>({
		validationSchema: toTypedSchema(createRoomValidationSchema),
		initialValues: {
			title: '',
			description: '',
			maxGuests: 0,
			price: 0,
			images: [],
		},
	});

	//---Функция отправки формы
	const onSubmit = handleSubmit(
		(values: RoomFormValues) => {
			// Получаем индекс обложки через ref
			const coverIndex = imagesTabRef.value?.getCoverIndex?.();
			// Создаем FormData
			const formData = new FormData();
			// Добавляем текстовые поля
			formData.append('title', values.title);
			formData.append('description', values.description);
			formData.append('maxGuests', values.maxGuests.toString());
			formData.append('price', values.price.toString());
			// Добавляем индекс обложки
			if (coverIndex !== null && coverIndex !== undefined) {
				formData.append('coverIndex', coverIndex.toString());
			}

			// Добавляем изображения
			if (values.images && values.images.length > 0) {
				values.images.forEach((image) => {
					formData.append('images', image);
				});
			}
			//Добавить поддержку типа RoomFormData
			//Реально будем отправлять формдата
			//headers: {
			//'Content-Type': 'multipart/form-data'}

			//Тестовый вывод
			const data = {
				title: values.title,
				description: values.description,
				maxGuests: values.maxGuests,
				images: values.images,
				price: values.price,
				coverIndex: coverIndex,
			};
			console.log(`Данные`, data);
		},
		(errors) => {
			//Можно разблокировать кнопку отправки и выводить всплывашку с невалидными полями
			//Пока выводим в консоль
			console.log('Ошибки валидации:', errors);
		}
	);

	//---Вычисляемые свойства валидности для каждого таба отдельно для галочки в табе и для разблокировки кнопки сабмита
	const isBasicTabValid = computed(() => {
		return (
			!errors.value.title &&
			values.title?.trim() !== '' &&
			!errors.value.description &&
			values.description?.trim() !== ''
		);
	});

	const isGuestsTabValid = computed(() => {
		return (
			!errors.value.maxGuests &&
			values.maxGuests !== 0 &&
			!errors.value.price &&
			values.price !== 0
		);
	});

	const isImagesTabValid = computed(() => {
		return (
			!errors.value.images &&
			values.images &&
			values.images.length >= VALIDATION_CONSTANTS.IMAGES.MIN
		);
	});

	//---Объект с валидностью всех табов
	//Доступность кнопки отправки
	const tabsValidity = computed(() => ({
		basic: isBasicTabValid.value,
		guests: isGuestsTabValid.value,
		images: isImagesTabValid.value,
	}));

	//---Функция проверки валидности таба
	//Переменная для галочки таба
	const isTabValid = (tabId: TabType): boolean => {
		return tabsValidity.value[tabId] || false;
	};
</script>

<template>
	<Section title="Добавление новой площадки">
		<template v-slot:section-content>
			<div class="flex justify-between items-center">
				<TabElement
					:tabs="tabs"
					:active-tab="activeTab"
					@tab-change="handleTabChange"
					:is-tab-valid="isTabValid"
				/>
				<button
					type="submit"
					:disabled="!meta.valid"
					form="room-form"
					class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Сохранить
				</button>
			</div>

			<form
				@submit.prevent="onSubmit"
				class="space-y-6"
				novalidate
				id="room-form"
			>
				<!-- Основная информация -->
				<div
					v-show="activeTab === 'basic'"
					class="p-6 border border-gray-200 rounded-lg bg-white"
				>
					<BasicInfoTab />
				</div>
				<!-- Картинки -->
				<div
					v-show="activeTab === 'images'"
					class="p-6 border border-gray-200 rounded-lg bg-white"
				>
					<ImagesTab ref="imagesTabRef" />
				</div>
				<!-- Вместимость -->
				<div
					v-show="activeTab === 'guests'"
					class="p-6 border border-gray-200 rounded-lg bg-white"
				>
					<GuestsTab />
				</div>
			</form>
		</template>
	</Section>
</template>

<style scoped></style>
