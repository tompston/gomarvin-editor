<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { latest_gomarvin_version } from "../assets/ts/gomarvin/predefined"
import ThemeSwitcher from './utils/ThemeSwitcher.vue'
const GH_REPO = 'https://github.com/tompston/gomarvin'
const navigationIsShown = ref(false)


// https://stackoverflow.com/questions/47219272/how-can-i-use-window-size-in-vue-how-do-i-detect-the-soft-keyboard
let windowWidth = ref(window.innerWidth)
const onWidthChange = () => windowWidth.value = window.innerWidth
onMounted(() => window.addEventListener('resize', onWidthChange))
onUnmounted(() => window.removeEventListener('resize', onWidthChange))


</script>

<template>
  <header class="flex-center">
    <div class="max-width-1">
      <div class="py-20 grid gtc-1-auto header disable-text-select">
        <div class="fw-400 header__left">
          <router-link to="/" class="remove-decorations fw-500">GOMARVIN</router-link>
        </div>
        <div class="header__right">
          <div class="flex gap-44 op-70">
            <div class="hover-underline hover-pointer">
              <router-link to="/" class="remove-decorations">Editor</router-link>
            </div>
            <div class="hover-underline hover-pointer">
              <router-link to="/docs" class="remove-decorations">Docs</router-link>
            </div>
            <div class="hover-underline hover-pointer remove-decorations">
              <a class="remove-decorations" :href="GH_REPO" rel="noreferrer" target="_blank">Github</a>
            </div>

            <ThemeSwitcher />

            <div class>{{ latest_gomarvin_version }}</div>
          </div>
        </div>

        <div class="header__burger hidden pointer" @click="navigationIsShown = !navigationIsShown">
          <svg width="20" height="13" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H23" stroke="var(--svg-fill)" stroke-width="2.5" />
            <path d="M0 9H23" stroke="var(--svg-fill)" stroke-width="2.5" />
            <path d="M0 18H23" stroke="var(--svg-fill)" stroke-width="2.5" />
          </svg>
        </div>

        <!-- <div>{{ navigationIsShown }}</div> -->
        <!-- <div>{{ windowWidth }}</div> -->
      </div>
    </div>
  </header>

  <div v-if="navigationIsShown && windowWidth < 670">
    <div class="flex-center">
      <div class="max-width-1">
        <div class="fs-8 fw-600 py-14 border-rad-3 header__navigation">
          <div class="flex-center gap-44 header__navigation__grid">
            <div class="hover-underline hover-pointer">
              <router-link to="/" class="remove-decorations">Editor</router-link>
            </div>
            <div class="hover-underline hover-pointer">
              <router-link to="/docs" class="remove-decorations">Docs</router-link>
            </div>
            <div class="hover-underline hover-pointer remove-decorations">
              <a class="remove-decorations" :href="GH_REPO" rel="noreferrer" target="_blank">Github</a>
            </div>

            <div class>{{ latest_gomarvin_version }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <hr class="hr-1-3" /> -->

  <div class="mb-24"></div>
</template>



<style>
.header__navigation {
  background-color: black;
  color: white;
  position: absolute;
  position: static;
  position: relative;
  /* width: 1fr; */
  /* min-width: 100%; */
  /* right: 0px; */
}
</style>