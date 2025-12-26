<script setup lang="ts">
	import Container from '@/components/layout/Container.vue';

	interface SectionProps {
		title?: string;
	}
	const props = defineProps<SectionProps>();
	const { title } = props;

	defineSlots<{
		default?: (props: {}) => any;
		'header-button'?: (props: {}) => any;
		'section-content'?: (props: {}) => any;
		'section-menu'?: (props: {}) => any;
	}>();
</script>

<template>
	<section class="section py-3">
		<Container>
			<div class="section__content flex flex-col gap-[15px]">
				<div
					class="section__header flex items-center justify-between gap-[30px]"
				>
					<h2 class="section__title font-normal text-[22px]">
						{{ title }}
					</h2>
					<div class="flex items-center">
						<slot name="header-button"></slot>
						<slot name="section-menu"></slot>
					</div>
				</div>
				<slot name="section-content"></slot>
			</div>
		</Container>
	</section>
</template>

<style scoped>
	.add-button {
		transition: all 0.3s ease-in-out;
		&:hover {
			transform: scale(1.1);
		}
	}
	.rooms-list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: 20px;
		row-gap: 20px;
	}
</style>
