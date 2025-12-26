<script setup lang="ts">
	import ImageUpload from '@/components/forms/ImageUpload.vue';
	import { ref } from 'vue';
	const imageUploadRef = ref<InstanceType<typeof ImageUpload>>();

	// Пробрасываем методы наружу
	defineExpose({
		getCoverIndex: () => imageUploadRef.value?.getCoverIndex?.(),
		getCoverImage: () => imageUploadRef.value?.getCoverImage?.(),
	});
</script>

<template>
	<ImageUpload ref="imageUploadRef" />
</template>

<style scoped></style>
