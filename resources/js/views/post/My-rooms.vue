<script setup lang="ts">
	import Section from '@/components/layout/Section.vue';
</script>

<template>
	<Section title="Мои площадки">
		<template v-slot:section-content>
			<p>Здесь показываются созданные площадки</p>
			<br />
			<p>
				Если площадок у пользователя нет, появляется сообщение об
				отсутствии и ссылка на создание
			</p>
		</template>
	</Section>
</template>

<style scoped></style>
