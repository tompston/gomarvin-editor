<script lang="ts" setup>
import { ref } from 'vue';

defineProps<{
  data: any[];
}>();
</script>

<template>
  <div class="container mx-auto">
    <table v-if="data" class="min-w-full divide-y divide-gray-200 mt-4">
      <thead>
        <tr>
          <th
            v-for="(value, key) in data[0]"
            :key="key"
            class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(row, index) in data" :key="index">
          <td
            v-for="(value, key) in row"
            :key="key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          >
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
