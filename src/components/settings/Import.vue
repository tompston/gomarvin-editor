<script setup lang="ts">
import { ref } from "vue";

defineProps<{ config: any; header: string }>();

const imported_conf = ref("");

function importConfig(config: any) {
  let parsed_imported_conf = JSON.parse(imported_conf.value);
  Object.assign(config, parsed_imported_conf);
}
</script>

<template>
  <div class="tab__header">{{ header }}</div>

  <textarea type="text" class="code import_new_config_input" v-model="imported_conf" />
  <div class="flex-center mt-[20px]">
    <button :disabled="imported_conf.length == 0" class="create_project_btn " @click="importConfig(config)">
      IMPORT
    </button>
  </div>
</template>

<style>
.import_new_config_input {
  min-height: 300px;
  height: 100%;
  width: 100%;
  padding: 15px !important;
  box-sizing: border-box;
}
</style>
