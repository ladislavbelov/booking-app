<script setup lang="ts">
	import Input from '@/components/forms/Input.vue';
	import Button from '@/components/ui/Button.vue';
	import { useForm } from 'vee-validate';

	import { toTypedSchema } from '@vee-validate/yup';
	import Modal from '@/components/ui/Modal.vue';
	import CustomCheckbox from '@/components/forms/CustomCheckbox.vue';
	import { useAuthStore } from '@/stores/AuthStore.ts';

	import { useModal } from '@/utils/useModal.ts';
	import { registrationValidationSchema } from '@/utils/formsValidation.ts';

	interface RegisterFormData {
		name: string;
		email: string;
		password: string;
		password_confirmation: string;
		role: string;
	}

	const authStore = useAuthStore();

	// Схема валидации надо выносить
	const validationSchema = registrationValidationSchema;
	const modal = useModal();

	const { handleSubmit, isSubmitting } = useForm<RegisterFormData>({
		validationSchema: toTypedSchema(validationSchema),
		initialValues: {
			name: '',
			email: '',
			password: '',
			role: 'get',
		},
	});

	const onSubmit = handleSubmit(async (values) => {
		const resultData = {
			name: values.name,
			email: values.email.trim(),
			password: values.password.trim(),
			password_confirmation: values.password_confirmation.trim(),
			role: values.role as 'get' | 'post',
		};
		await authStore.registration(resultData);
		modal.open();
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
				name="name"
				placeholder="Введите ваше имя"
				label="Ваше имя"
				input-type="text"
				autocomplete="name"
			/>
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
			<div class="flex flex-col gap-4 w-full justify-center items-center">
				<span>Я буду</span>
				<CustomCheckbox
					id="role"
					name="role"
					value="get"
				/>
			</div>
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
	<Modal
		v-model="modal.isOpen.value"
		title="Успешно"
		@close="modal.close"
	>
		<p class="text-[16px] text-[#7c7c7c] text-center">
			Вы успешно зарегистрировались!
		</p>
	</Modal>
</template>
