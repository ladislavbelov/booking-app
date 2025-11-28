<script setup lang="ts">
	import Input from '@/components/forms/Input.vue';
	import Button from '@/components/ui/Button.vue';
	import { useForm } from 'vee-validate';
	import * as yup from 'yup';
	import { toTypedSchema } from '@vee-validate/yup';

	interface RegisterFormData {
		email: string;
		password: string;
		password_confirmation: string;
	}
	// Схема валидации
	const validationSchema = yup.object({
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

	const { handleSubmit, isSubmitting } = useForm<RegisterFormData>({
		validationSchema: toTypedSchema(validationSchema),
		initialValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = handleSubmit((values) => {
		const resultData = {
			email: values.email.trim(),
			password: values.password.trim(),
		};
		console.log('Данные формы:', resultData);

		// Отправка на сервер
	});
</script>

<template>
	<div class="flex flex-col gap-4 w-full justify-center items-center">
		<form
			class="md:max-w-[440px] flex flex-col gap-4 w-full"
			@submit="onSubmit"
		>
			<!--			В регистрации при вводе email можно отправлять запрос с дебаунс еще до нажатия-->
			<!--			кнопки отправить и проверять есть ли такое мыло в бд, если есть то-->
			<!--			ошибка через setError-->
			<Input
				name="email"
				placeholder="Введите ваш email"
				label="Email"
				input-type="email"
				autocomplete="email"
			/>

			<Input
				name="password"
				placeholder="Введите пароль"
				label="Пароль"
				input-type="password"
				autocomplete="current-password"
			/>
			<Input
				name="password_confirmation"
				placeholder="Пароль еще раз"
				label="Подтверждение пароля"
				input-type="password"
				autocomplete="current-password"
			/>

			<Button
				type="submit"
				:disabled="isSubmitting"
				class="bg-[#FE4A49] text-white rounded-[12px] py-2.5 px-5 w-full self-center hover:bg-[#de3c3c] transition-all"
			>
				{{ isSubmitting ? 'Регистрация...' : 'Зарегистрироваться' }}
			</Button>
		</form>
		<p class="text-[14px]">
			Есть аккаунт?
			<router-link
				to="login"
				class="font-semibold text-[#FE4A49] text-[16px]"
				>Войти</router-link
			>
		</p>
	</div>
</template>
