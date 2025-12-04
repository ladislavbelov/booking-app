<script setup lang="ts">
	import Input from '@/components/forms/Input.vue';
	import Button from '@/components/ui/Button.vue';
	import { useForm } from 'vee-validate';
	import * as yup from 'yup';
	import { toTypedSchema } from '@vee-validate/yup';
	import { useAuthStore } from '@/stores/AuthStore.ts';
	import router from '@/router';

	interface LoginFormData {
		email: string;
		password: string;
	}
	const authStore = useAuthStore();

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
	});

	const { handleSubmit, isSubmitting } = useForm<LoginFormData>({
		validationSchema: toTypedSchema(validationSchema),
		initialValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = handleSubmit(async (values) => {
		const resultData = {
			email: values.email.trim(),
			password: values.password.trim(),
		};

		await authStore.login(resultData);
		// Если авторизация успешна, перенаправляем на главную
		if (authStore.isAuthenticated && !authStore.isLoading) {
			router.push({
				path: '/',
			});
		}
	});
</script>

<template>
	<div class="flex flex-col gap-4 w-full justify-center items-center">
		<form
			class="md:max-w-[440px] flex flex-col gap-4 w-full"
			@submit="onSubmit"
		>
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
			<router-link
				to="/password_reset"
				class="self-center"
				>Забыли пароль?</router-link
			>
			<Button
				type="submit"
				:disabled="isSubmitting"
				class="bg-[#FE4A49] text-white rounded-[12px] py-2.5 px-5 w-full self-center hover:bg-[#de3c3c] transition-all"
			>
				{{ isSubmitting ? 'Вход...' : 'Войти' }}
			</Button>
		</form>
		<p class="text-[14px]">
			Еще нет аккаунта?
			<router-link
				to="register"
				class="font-semibold text-[#FE4A49] text-[16px]"
				>Регистрация</router-link
			>
		</p>
	</div>
</template>
