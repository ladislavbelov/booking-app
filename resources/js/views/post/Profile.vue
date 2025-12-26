<script setup lang="ts">
	import { useAuthStore } from '@/stores/AuthStore.ts';
	import Section from '@/components/layout/Section.vue';
	import { computed, ref, shallowRef } from 'vue';

	// Импортируем иконки
	import { Users, ChartBar } from 'lucide-vue-next';

	// Импортируем компоненты
	import Analytics from '@/components/admin/Analytics.vue';
	import Personal from '@/components/admin/Personal.vue';

	const authStore = useAuthStore();
	const userName = authStore.userName;

	const sectionTitle = computed(() => {
		return `Добро пожаловать, ${userName}`;
	});

	// Определяем табы админки, можно потом вынести отдельно когда делать будем админку
	const adminTabs = [
		{
			id: 'dashboard',
			label: 'Аналитика',
			icon: ChartBar,
			component: Analytics,
		},
		{
			id: 'personal',
			label: 'Данные профиля',
			icon: Users,
			component: Personal,
		},
	];
	//реактивная ссылка (ref), с поверхностной реактивностью (shallowRef), оптимально при табах
	const activeTab = ref(adminTabs[0].id);
	const activeComponent = shallowRef(adminTabs[0].component);
	//Функция переключения таба, можно вынести логику отдельно дабы не раздувать код, логика "почти" идентичная с табами в создании комнаты
	const switchTab = (tabId: string) => {
		const tab = adminTabs.find((t) => t.id === tabId);
		if (tab) {
			activeTab.value = tabId;
			activeComponent.value = tab.component;
		}
	};
</script>

<template>
	<Section :title="sectionTitle">
		<template v-slot:section-menu>
			<div class="admin-tabs-container">
				<div class="admin-tabs">
					<button
						v-for="tab in adminTabs"
						:key="tab.id"
						class="admin-tab"
						:class="{ 'admin-tab--active': activeTab === tab.id }"
						@click="switchTab(tab.id)"
					>
						<component
							:is="tab.icon"
							class="admin-tab__icon"
						/>
						<span>{{ tab.label }}</span>
					</button>
				</div>
			</div>
		</template>

		<template v-slot:section-content>
			<div class="admin-content">
				<component :is="activeComponent" />
			</div>
		</template>
	</Section>
</template>

<style scoped>
	.admin-tabs-container {
		margin-left: auto;
	}

	.admin-tabs {
		display: flex;
		gap: 4px;
		background: #f3f4f6;
		border-radius: 8px;
		padding: 4px;
	}

	.admin-tab {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		background: transparent;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
		color: #6b7280;
		font-size: 14px;
		font-weight: 500;
	}

	.admin-tab:hover {
		background: #e5e7eb;
	}

	.admin-tab--active {
		background: white;
		color: var(--color-primary-orange);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.admin-tab__icon {
		width: 16px;
		height: 16px;
	}

	.admin-content {
		background: white;
		border-radius: 8px;
		padding: 24px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
</style>
