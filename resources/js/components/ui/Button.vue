<script setup lang="ts">
    interface ButtonProps {
        type: 'reset' | 'submit' | 'button',
    }
    const props = withDefaults(defineProps<ButtonProps>(), {
        type: 'button',
    })
</script>

<template>
    <button :type="props.type" class="button" :class="$attrs.class">
      <slot></slot>
    </button>
</template>

<style scoped>
.button {
        cursor: pointer;
    }
</style>
