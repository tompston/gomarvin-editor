<script setup lang="ts">
import JsonRow from './JsonRow.vue';
import { ref } from 'vue';

const props = defineProps<{
  data: Array<object> | object;
}>();

function isObject(value: any): boolean {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function getData(inputData: Array<object> | object): Array<object> | object {
  if (Array.isArray(inputData)) return inputData;
  if (
    isObject(inputData) &&
    inputData.hasOwnProperty('status') &&
    inputData.hasOwnProperty('data')
  ) {
    // @ts-ignore
    return Array.isArray(inputData.data) ? inputData.data : [inputData.data];
  }
  return [inputData];
}

const data = ref(getData(props.data));
// @ts-ignore
const headers = ref(Object.keys(data.value[0]));
</script>

<template>
  <table v-if="data" class="min-w-full mt-4">
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header"
          class="pl-6 py-2 bg-light-select-1 text-left text-[10px] fw-700 uppercase tracking-wider sticky top-0"
        >
          <span class="opacity-80">{{ header }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index" class="border-1-3-bottom">
        <td
          v-for="(value, key) in row"
          :key="key"
          class="pl-5 py-2 whitespace-nowrap text-[13px] max-w-[400px]"
        >
          <template v-if="isObject(value)">
            <JsonRow :value="value" />
          </template>
          <template v-else>
            {{ value }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
