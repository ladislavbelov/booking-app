import * as yup from 'yup';
import { RoomFormValues } from '@/types/rooms.ts';
export const VALIDATION_CONSTANTS = {
	TITLE: {
		REQUIRED: 'Название обязательно',
		MIN_LENGTH: 5,
		MIN_MESSAGE: 'Минимум 5 символов в названии',
		MAX_LENGTH: 100,
		MAX_MESSAGE: 'Максимум 100 символов',
	},
	DESCRIPTION: {
		REQUIRED: 'Описание обязательно',
		MIN_LENGTH: 5,
		MIN_MESSAGE: 'Минимум 5 символов',
		MAX_LENGTH: 500,
		MAX_MESSAGE: 'Максимум 500 символов',
	},
	MAX_GUESTS: {
		REQUIRED: 'Количество гостей обязательно',
		MIN: 1,
		MIN_MESSAGE: 'Минимум 1 гость',
		MAX: 100,
		MAX_MESSAGE: 'Максимум 100 гостей',
		INTEGER: 'Должно быть целое число',
		TYPE_ERROR: 'Введите число',
	},
	PRICE: {
		REQUIRED: 'Цена обязательна',
		MIN: 1,
		MIN_MESSAGE: 'Цена не может быть отрицательной или равной 0',
		MAX: 1000000,
		MAX_MESSAGE: 'Максимальная цена 1,000,000',
		INTEGER: 'Цена должна быть целым числом',
		TYPE_ERROR: 'Введите число',
	},
	IMAGES: {
		REQUIRED: 'Изображения обязательны',
		MIN: 3,
		MIN_MESSAGE: 'Необходимо минимум 3 изображения',
		MAX: 5,
		MAX_MESSAGE: 'Максимум 5 изображений',
		FILE_TYPE_MESSAGE: 'Допустимы только изображения JPEG/JPG',
	},
} as const;

//LOGIN FORM VALIDATION
export const loginValidationSchema = yup.object({
	email: yup
		.string()
		.required('Email обязателен')
		.transform((value) => value?.trim())
		.matches(/^\S*$/, 'Email не должен содержать пробелы')
		.email('Введите корректный email'),
	password: yup
		.string()
		.required('Пароль обязателен')
		.transform((value) => value?.trim())
		.min(6, 'Пароль должен быть не менее 6 символов')
		.matches(/^\S*$/, 'Пароль не должен содержать пробелы'),
});

//REGISTRATION FORM VALIDATION
export const registrationValidationSchema = yup.object({
	name: yup
		.string()
		.required('Имя обязательно')
		.transform((value) => value?.trim())
		.matches(/^\S*$/, 'Имя не должено содержать пробелы')
		.min(4, 'Имя должно быть не мее 4 символов'),

	email: yup
		.string()
		.required('Email обязателен')
		.transform((value) => value?.trim())
		.matches(/^\S*$/, 'Email не должен содержать пробелы')
		.email('Введите корректный email'),
	password: yup
		.string()
		.required('Пароль обязателен')
		.transform((value) => value?.trim())
		.min(6, 'Пароль должен быть не менее 6 символов')
		.matches(/^\S*$/, 'Пароль не должен содержать пробелы'),
	password_confirmation: yup
		.string()
		.required('Подтверждение пароля обязательно')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const createRoomValidationSchema: yup.ObjectSchema<RoomFormValues> =
	yup.object({
		title: yup
			.string()
			.required(VALIDATION_CONSTANTS.TITLE.REQUIRED)
			.min(
				VALIDATION_CONSTANTS.TITLE.MIN_LENGTH,
				VALIDATION_CONSTANTS.TITLE.MIN_MESSAGE
			)
			.max(
				VALIDATION_CONSTANTS.TITLE.MAX_LENGTH,
				VALIDATION_CONSTANTS.TITLE.MAX_MESSAGE
			),

		description: yup
			.string()
			.required(VALIDATION_CONSTANTS.DESCRIPTION.REQUIRED)
			.min(
				VALIDATION_CONSTANTS.DESCRIPTION.MIN_LENGTH,
				VALIDATION_CONSTANTS.DESCRIPTION.MIN_MESSAGE
			)
			.max(
				VALIDATION_CONSTANTS.DESCRIPTION.MAX_LENGTH,
				VALIDATION_CONSTANTS.DESCRIPTION.MAX_MESSAGE
			),

		maxGuests: yup
			.number()
			.required(VALIDATION_CONSTANTS.MAX_GUESTS.REQUIRED)
			.min(
				VALIDATION_CONSTANTS.MAX_GUESTS.MIN,
				VALIDATION_CONSTANTS.MAX_GUESTS.MIN_MESSAGE
			)
			.max(
				VALIDATION_CONSTANTS.MAX_GUESTS.MAX,
				VALIDATION_CONSTANTS.MAX_GUESTS.MAX_MESSAGE
			)
			.integer(VALIDATION_CONSTANTS.MAX_GUESTS.INTEGER)
			.typeError(VALIDATION_CONSTANTS.MAX_GUESTS.TYPE_ERROR),

		price: yup
			.number()
			.required(VALIDATION_CONSTANTS.PRICE.REQUIRED)
			.min(
				VALIDATION_CONSTANTS.PRICE.MIN,
				VALIDATION_CONSTANTS.PRICE.MIN_MESSAGE
			)
			.max(
				VALIDATION_CONSTANTS.PRICE.MAX,
				VALIDATION_CONSTANTS.PRICE.MAX_MESSAGE
			)
			.integer(VALIDATION_CONSTANTS.PRICE.INTEGER)
			.typeError(VALIDATION_CONSTANTS.PRICE.TYPE_ERROR),

		images: yup
			.array()
			.of(yup.mixed<File>().required())
			.min(
				VALIDATION_CONSTANTS.IMAGES.MIN,
				VALIDATION_CONSTANTS.IMAGES.MIN_MESSAGE
			)
			.max(
				VALIDATION_CONSTANTS.IMAGES.MAX,
				VALIDATION_CONSTANTS.IMAGES.MAX_MESSAGE
			)
			.required(VALIDATION_CONSTANTS.IMAGES.REQUIRED)
			.test(
				'file-type',
				VALIDATION_CONSTANTS.IMAGES.FILE_TYPE_MESSAGE,
				(files) => {
					if (!files) return true;
					return files.every(
						(file) =>
							file.type === 'image/jpeg' ||
							file.type === 'image/jpg' ||
							file.name.toLowerCase().endsWith('.jpg') ||
							file.name.toLowerCase().endsWith('.jpeg')
					);
				}
			),
	});
