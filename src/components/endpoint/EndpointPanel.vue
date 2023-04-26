<script setup lang="ts">
defineProps<{
  header: string;
}>();
</script>

<template>
  <div >
    <div class="grid grid-cols-1 overflow-auto">
      <slot />
    </div>
  </div>
</template>
