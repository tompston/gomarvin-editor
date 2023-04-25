<script setup lang="ts">
defineProps<{
  header: string;
}>();
</script>

<template>
  <div class="border-1-2---">
    <div>
      <slot />
    </div>
  </div>
</template>
