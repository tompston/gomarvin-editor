<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  value: object;
}>();

function nestedObjectToString(nestedObject: object): string {
  return JSON.stringify(nestedObject, null, 2);
}
</script>

<template>
  <pre class="text-[11px]"
    >{{ nestedObjectToString(value) }}
            </pre
  >
  <!-- {{ value }} -->
</template>
