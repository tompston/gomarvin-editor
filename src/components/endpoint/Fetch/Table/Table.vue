<script setup lang="ts">
import TableRow from './TableRow.vue';
import { VNode, h, ref } from 'vue';

const props = defineProps<{
  data: Array<object> | object;
}>();

function isObject(value: any): boolean {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function nestedObjectToString(nestedObject: object): string {
  return JSON.stringify(nestedObject, null, 2);
  // const nestedList = Object.entries(nestedObject)
  //   .map(([key, value]) => `<li><strong>${key}:</strong> ${JSON.stringify(value)}</li>`)
  //   .join('');
  // return `<ul>${nestedList}</ul>`;
}

function renderNestedObject(
  nestedObject: object,
  indentLevel: number = 0,
): Array<VNode<any>> {
  const elements: Array<VNode<any>> = [];
  const indent = '  '.repeat(indentLevel);

  for (const [key, value] of Object.entries(nestedObject)) {
    if (isObject(value)) {
      elements.push(h('div', `${indent}${key}:`));
      elements.push(...renderNestedObject(value, indentLevel + 1));
    } else if (Array.isArray(value)) {
      elements.push(h('div', `${indent}${key}: [${value.join(', ')}]`));
    } else {
      elements.push(h('div', `${indent}${key}: ${value}`));
    }
  }

  return elements;
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

// const data = ref(Array.isArray(props.data) ? props.data : [props.data]);

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
          <span class="opacity-70">{{ header }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index" class="border-1-3-bottom">
        <td
          v-for="(value, key) in row"
          :key="key"
          class="pl-6 py-3 whitespace-nowrap text-[13px] w-auto--- max-w-[400px] overflow-scroll---"
        >
          <template v-if="isObject(value)">
            <pre class="text-[11px]">
{{ nestedObjectToString(value) }}
            </pre>
          </template>
          <template v-else>
            {{ value }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
