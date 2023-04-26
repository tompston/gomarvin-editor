<script setup lang="ts">
defineProps<{
  header: string;
}>();
</script>

<template>
  <div >
    <div class="grid grid-cols-1 overflow-x---">
      <slot />
    </div>
  </div>
</template>
