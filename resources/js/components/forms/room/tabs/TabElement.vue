<script setup lang="ts">
	import { TabConfig, TabType } from '@/utils/navigation.ts';

	interface Props {
		tabs: TabConfig[];
		activeTab?: TabType;
		isTabValid?: (tabId: TabType) => boolean;
	}

	const props = defineProps<Props>();
	const emit = defineEmits<{
		'tab-change': [tabId: TabType];
	}>();

	const switchTab = (tabId: TabType) => {
		if (props.activeTab === tabId) return;
		emit('tab-change', tabId);
	};
</script>

<template>
	<div class="flex border-b border-gray-200 gap-5">
		<button
			v-for="tab in tabs"
			:key="tab.id"
			@click="switchTab(tab.id)"
			:class="[
				'flex gap-2.5 items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap cursor-pointer',
				activeTab === tab.id
					? 'border-blue-500 text-blue-600'
					: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
			]"
		>
			<component
				:is="tab.icon"
				class="w-5 h-5"
				v-if="tab.icon"
			/>
			{{ tab.label }}

			<!-- Галочка валидности -->
			<!-- Переделать в отдельный компонент галочку -->
			<svg
				v-if="isTabValid && isTabValid(tab.id)"
				class="w-5 h-5 ml-2 text-green-500 transition-all duration-300"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					fill-rule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
</template>
