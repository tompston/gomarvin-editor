<script setup lang="ts">
import * as editor from '../assets/ts/editor/editor'
import ToolSvg from './utils/svg/ToolSvg.vue'
import { ref } from 'vue'

defineProps<{ config: any; module: any }>()

const edit_options_are_shown = ref(false)
const wants_to_delete_module = ref(false)
</script>

<template>
  <div class="grid grid-cols-[1fr_auto] module__toolbar tab__header">
    <div class="">{{ module.name }}</div>
    <div class="flex">

      <transition name="fade">
        <div v-if="edit_options_are_shown">
          <div class="flex gap-[10px]">
            <button class="flex-center module__toolbar_option"
              @click="; (wants_to_delete_module = true), (edit_options_are_shown = false)">DELETE</button>
            <button class="flex-center module__toolbar_option"
              @click="editor.addCrudEndpoints(module), (edit_options_are_shown = false)">ADD CRUD</button>
          </div>
        </div>
      </transition>

      <button class="flex-center disable-text-select ml-[10px] module__toolbar_tool_btn"
        @click="edit_options_are_shown = !edit_options_are_shown">
        <div class="flex-center border-rad-5 border-1-2">
          <ToolSvg dims="28" fill="var(--svg-fill)" class="p-[8px] opacity-60" />
        </div>
      </button>

    </div>
  </div>

  <!--  -->
  <transition name="fade">
    <div v-if="wants_to_delete_module">
      <div class="modal__overlay" @click="wants_to_delete_module = false"></div>
      <div class="modal__content max-w-[400px]">
        <div class="p-[20px] w-full h-full">
          <div class="fs-3">Really want to delete {{ module.name }} module?</div>
          <div class="flex w-full gap-[10px] mt-[20px]">
            <button class="border-1-1 p-[6px] flex-center w-full border-rad-4"
              @click="editor.deleteModule(config.modules, module.name)">Yes</button>
            <button class="border-1-1 p-[6px] flex-center w-full border-rad-4"
              @click="wants_to_delete_module = false">Nope</button>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>
