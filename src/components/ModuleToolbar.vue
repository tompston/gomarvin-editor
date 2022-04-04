<script setup lang="ts">
import * as editor from '../assets/ts/editor/editor'
import * as utils from '../assets/ts/utils/utils'
import { ref } from 'vue'

import DeleteSvg from './utils/svg/DeleteSvg.vue'
import ToolSvg from './utils/svg/ToolSvg.vue'

defineProps<{ config: any; module: any }>()

const edit_options_are_shown = ref(false)
const wants_to_delete_module = ref(false)
</script>

<template>
  <div class="grid gtc-1-auto mb-8-- module__toolbar tab--header">
    <div class="tab--header--">{{ module.name }}</div>
    <div class="flex">
      <!-- <div></div> -->
      <transition name="fade">
        <div v-if="edit_options_are_shown">
          <div class="flex gap-10">
            <button
              class="flex-center module__toolbar_option"
              @click="; (wants_to_delete_module = true), (edit_options_are_shown = false)"
            >DELETE</button>
            <button
              class="flex-center module__toolbar_option"
              @click="editor.addCrudEndpoints(module), (edit_options_are_shown = false)"
            >ADD CRUD</button>
          </div>
        </div>
      </transition>
      <button
        class="flex-center disable-text-select ml-10 module__toolbar_tool_btn"
        @click="edit_options_are_shown = !edit_options_are_shown"
      >
        <div class="flex-center border-rad-5 border-1-1">
          <ToolSvg dims="15" fill="var(--svg-fill)" class="p-8 op-80" />
        </div>
      </button>
    </div>
  </div>

  <!--  -->
  <transition name="fade">
    <div v-if="wants_to_delete_module">
      <div class="modal__overlay" @click="wants_to_delete_module = false"></div>
      <div class="modal__content max-w-400">
        <div class="p-20 both-100">
          <div class="fs-3">Really want to delete {{ module.name }} module?</div>
          <div class="flex width-100 gap-10 mt-20">
            <button
              class="border-1-1 p-6 flex-center width-100 border-rad-4"
              @click="editor.deleteModule(config.modules, module.name)"
            >Yes</button>
            <button
              class="border-1-1 p-6 flex-center width-100 border-rad-4"
              @click="wants_to_delete_module = false"
            >Nope</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

