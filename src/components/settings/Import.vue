<script setup lang="ts">
import * as utils from '../../assets/ts/utils/utils'
import { ref } from 'vue'

defineProps<{ config: any, header: string }>()

const imported_conf = ref('')

function importConfig(config: any) {

  let parsed_imported_conf = JSON.parse(imported_conf.value)
  // console.log(parsed_imported_conf)
  Object.assign(config, parsed_imported_conf)
}

</script>

<template>
  <div class="tab--header">{{ header }}</div>

  <textarea type="text" class="code import_new_config_input" v-model="imported_conf" />
  <div class="flex-center mt-20">
    <button
      :disabled="imported_conf.length == 0"
      class="create_project_btn py-10 py-10 px-12 fw-700 border-rad-4 fs-10"
      @click="importConfig(config)"
    >IMPORT</button>
  </div>
</template>

