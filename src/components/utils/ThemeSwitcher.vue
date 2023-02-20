<script setup lang="ts">
import { ref, onMounted } from "vue";

const currentTheme = ref(localStorage.getItem("theme"));

// all credits go to this --> https://tutorial.tips/how-to-create-theme-switcher-in-css-and-javascript/
function switchTheme() {

  const localstorage_key = localStorage.getItem("theme")

  // if (localstorage_key === null){
  //   localStorage.setItem("theme", "dark");
  // }

  const toggleValue = localstorage_key === "dark" ? "light" : "dark";
  localStorage.setItem("theme", toggleValue);
  setTheme();
  currentTheme.value = toggleValue;
}

function setTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.body.dataset.theme = currentTheme;
}

onMounted(() => {
  setTheme();
});
</script>

<template>
  <button id="theme-switcher" ref="themeSwitch" @click="switchTheme()">
    Theme
  </button>
</template>
