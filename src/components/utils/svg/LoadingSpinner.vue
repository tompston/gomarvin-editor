<script setup lang="ts">
// import { ref } from 'vue';
// Credits
// https://cssloaders.github.io/

// defineProps<{
//   dims: number;
//   // color: string;
// }>();
</script>

<template>
  <span class="loader"></span>
</template>

<style>
.loader {
  width: 16px;
  height: 16px;
  border: 3px solid gray;
  /* border-style: solid; */
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1.5s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
