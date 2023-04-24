<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  data: any;
}>();

function isObject(value: any): boolean {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function nestedObjectToString(nestedObject: object): string {
  return Object.entries(nestedObject)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
}
</script>

<template>
  <div class="grid grid-cols-1 overflow-auto">
    <div class="container max-h-[370px]">
      <table v-if="data" class="min-w-full mt-4">
        <thead>
          <tr>
            <th
              v-for="(value, key) in data[0]"
              :key="key"
              class="pl-6 py-2 bg-light-select-1 text-left text-[10px] fw-700 uppercase tracking-wider sticky top-0"
            >
              <span class="opacity-70">{{ key }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index" class="border-1-3-bottom">
            <td
              v-for="(value, key) in row"
              :key="key"
              class="pl-6 py-1 whitespace-nowrap text-[13px] w-auto max-w-[200px] overflow-auto"
            >
              <template v-if="isObject(value)">
                {{ nestedObjectToString(value) }}
              </template>
              <template v-else>
                {{ value }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
