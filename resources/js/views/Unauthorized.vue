<template>
	<div class="unauthorized-page">
		<div class="container">
			<h1>Доступ запрещен</h1>
			<p>У вас нет прав для доступа к этой странице.</p>

			<div class="actions">
				<router-link
					v-if="!isAuthenticated"
					to="/auth/login"
					class="btn btn-primary"
				>
					Войти
				</router-link>

				<template v-else>
					<router-link
						v-if="userRole === 'get'"
						to="/get"
						class="btn btn-primary"
					>
						Перейти в панель get
					</router-link>

					<router-link
						v-if="userRole === 'post'"
						to="/post/dashboard"
						class="btn btn-primary"
					>
						Перейти в панель post
					</router-link>

					<router-link
						v-if="userRole === 'superadmin'"
						to="/admin/dashboard"
						class="btn btn-primary"
					>
						Перейти в админ-панель
					</router-link>
				</template>

				<router-link
					to="/"
					class="btn btn-secondary"
				>
					На главную
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useAuthStore } from '@/stores/AuthStore';

	const authStore = useAuthStore();
	const isAuthenticated = authStore.isAuthenticated;
	const userRole = authStore.user?.role;
</script>

<style scoped>
	.unauthorized-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: gray;
		color: white;
		text-align: center;
	}

	.container {
		max-width: 600px;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 20px;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.2rem;
		margin-bottom: 2rem;
	}

	.actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border-radius: 50px;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.3s;
	}

	.btn-primary {
		background: white;
		color: #667eea;
	}

	.btn-primary:hover {
		background: #f8f9fa;
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: transparent;
		color: white;
		border: 2px solid white;
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.1);
	}
</style>
