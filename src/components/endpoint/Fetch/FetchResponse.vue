<script lang="ts" setup>
import { ref } from 'vue';
import ResponseTable from './ResponseTable.vue';

const props = defineProps<{
  data: any;
}>();
function isObject(value: any): boolean {
  return value && typeof value === 'object' && !Array.isArray(value);
}
</script>

<template>
  <div class="grid grid-cols-1 overflow-auto">
    <div class="container max-h-[370px]">
      <div v-if="data">
        <ResponseTable :data="data" />
      </div>
    </div>
  </div>
</template>
