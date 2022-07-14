<script setup lang="ts">
import { ref } from 'vue'
import ProjectSettingsGrid from './ProjectSettingsGrid.vue'
import { saveDataToJsonFile } from '../../assets/ts/utils/storage'
defineProps<{ config: any, header: any }>()

</script>

<template>
  <div>
    <div class="tab__header">{{ header }}</div>

    <ProjectSettingsGrid :project_info="config.project_info" :new_project="false" />

    <!-- <div>
      <button class="border-1-2 p-6 px-16 fs-9 temp-main-col-1 text-col-2" @click="saveDataToJsonFile(config)">Save to JSON</button>
    </div>-->
  </div>
</template>
