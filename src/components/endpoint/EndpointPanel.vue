<script setup lang="ts">
defineProps<{
  header: string;
}>();
</script>

<template>
  <div class="border-1-2---">
    <!-- <div class="fw-700 fs-10 bg-light-select-1 py-1.5 pl-4">
      <span class="opacity-80">
        {{ header }}
      </span>
    </div> -->
    <!-- <div class="fw-700 fs-9">
      <span class="opacity-80---">
        {{ header }}
      </span>
    </div> -->

    <div>
      <slot />
    </div>
  </div>
</template>

<style></style>
