<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ dims: any; fill: string; class: string }>()
</script>

<template>
  <svg
    :class="class"
    :width="dims"
    :height="dims"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.79248 6.79736H5.79248H21.7925"
      :stroke="fill"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.79248 6.79736V4.79736C8.79248 4.26693 9.00319 3.75822 9.37827 3.38315C9.75334 3.00808 10.262 2.79736 10.7925 2.79736H14.7925C15.3229 2.79736 15.8316 3.00808 16.2067 3.38315C16.5818 3.75822 16.7925 4.26693 16.7925 4.79736V6.79736M19.7925 6.79736V20.7974C19.7925 21.3278 19.5818 21.8365 19.2067 22.2116C18.8316 22.5866 18.3229 22.7974 17.7925 22.7974H7.79248C7.26205 22.7974 6.75334 22.5866 6.37827 22.2116C6.00319 21.8365 5.79248 21.3278 5.79248 20.7974V6.79736H19.7925Z"
      :stroke="fill"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.7925 11.7974V17.7974"
      :stroke="fill"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.7925 11.7974V17.7974"
      :stroke="fill"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style>
</style>