<script setup lang="ts">
import ThemeSwitcher from './utils/ThemeSwitcher.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import * as gomarvin from '../assets/ts/gomarvin';


const navigationIsShown = ref(false);
const GH_REPO = 'https://github.com/tompston/gomarvin';

// https://stackoverflow.com/questions/47219272/how-can-i-use-window-size-in-vue-how-do-i-detect-the-soft-keyboard
let windowWidth = ref(window.innerWidth);
const onWidthChange = () => (windowWidth.value = window.innerWidth);
onMounted(() => window.addEventListener('resize', onWidthChange));
onUnmounted(() => window.removeEventListener('resize', onWidthChange));
</script>

<template>
  <header class="flex-center border-1-3-bottom--">
    <div class="max-width-1">
      <div
        class="py-3.5 grid grid-cols-[1fr_auto] disable-text-select fs-8 sm:grid-rows-[1fr_auto]"
      >
        <div class="fw-400">
          <router-link to="/" class="remove-decorations fw-700 fs-10"
            >GOMARVIN</router-link
          >
        </div>
        <!--  -->
        <div class="hide-on-sm">
          <div>
            <div class="flex gap-[30px] opacity-60">
              <!-- <div class="hover-underline hover-pointer">
                <router-link to="/" class="remove-decorations">Editor</router-link>
              </div> -->
              <div class="hover-underline hover-pointer">
                <router-link to="/docs" class="remove-decorations">Docs</router-link>
              </div>
              <div class="hover-underline hover-pointer remove-decorations">
                <a
                  class="remove-decorations"
                  :href="GH_REPO"
                  rel="noreferrer"
                  target="_blank"
                  >Github</a
                >
              </div>
              <ThemeSwitcher />
              <div class>{{ gomarvin.latest_gomarvin_version }}</div>
            </div>
          </div>
        </div>

        <div class="flex-center">
          <div
            class="hidden pointer show-on-sm flex-center"
            @click="navigationIsShown = !navigationIsShown"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 23 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 1H23" stroke="var(--svg-fill)" stroke-width="2.5" />
              <path d="M0 9H23" stroke="var(--svg-fill)" stroke-width="2.5" />
              <path d="M0 18H23" stroke="var(--svg-fill)" stroke-width="2.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="flex-center">
    <div class="max-width-1">
      <!-- <hr class="hr-1-3 border-1-3-bottom"> -->
      <div class="border-1-3-bottom"></div>
    </div>
  </div>

  <div v-if="navigationIsShown && windowWidth < 750">
    <div class="flex-center">
      <div class="max-width-1">
        <div class="fs-8 fw-600 py-[14px] border-rad-3 bg-black text-white relative">
          <div class="flex-center gap-[44px]">
            <div class="hover-underline hover-pointer">
              <router-link to="/" class="remove-decorations">Editor</router-link>
            </div>
            <div class="hover-underline hover-pointer">
              <router-link to="/docs" class="remove-decorations">Docs</router-link>
            </div>
            <div class="hover-underline hover-pointer remove-decorations">
              <a
                class="remove-decorations"
                :href="GH_REPO"
                rel="noreferrer"
                target="_blank"
                >Github</a
              >
            </div>
            <div class>{{ gomarvin.latest_gomarvin_version }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-[24px]"></div>
</template>
