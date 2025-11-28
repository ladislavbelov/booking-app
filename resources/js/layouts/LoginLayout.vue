<template>
	<div class="login-layout">
		<main class="flex">
			<div class="hidden md:max-w-[45%] md:w-full md:block">
				<img
					src="/images/bg_01.jpg"
					alt="Профессиональный микрофон на стойке с мониторными наушниками для звукозаписи"
					class="w-full h-full object-cover"
					loading="eager"
					decoding="sync"
				/>
			</div>
			<div class="flex flex-col grow p-[20px] colored">
				<div class="flex justify-between items-center">
					<!--					Тут проверка истории нужна и условный рендер-->
					<button
						class="flex gap-1.5 items-center cursor-pointer"
						@click="$router.back"
						aria-label="Вернуться назад"
					>
						<MoveLeft />Назад
					</button>
					<router-link
						to="/"
						class="flex items-center max-w-max"
						aria-label="Вернуться на главную страницу"
					>
						<Logo />
					</router-link>
				</div>

				<div class="grow flex flex-col items-center justify-center">
					<p class="font-semibold text-3xl text-center mb-[30px]">
						Авторизация
					</p>
					<router-view />
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
	import Logo from '@/components/ui/Logo.vue';
	import { MoveLeft } from 'lucide-vue-next';
</script>

<style scoped>
	.login-layout {
		min-height: 100vh;
		max-height: 100vh;
		display: flex;
	}

	main {
		flex: 1;
	}
	img {
		object-fit: cover;
	}
	.colored {
		background: linear-gradient(270deg, #c2ecf5 0%, #fff 100%);
	}
</style>
