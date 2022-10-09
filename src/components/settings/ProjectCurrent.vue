<script setup lang="ts">
import ProjectSettingsGrid from "./ProjectSettingsGrid.vue";
defineProps<{ config: any; header: any }>();
</script>

<template>
  <div>
    <div class="tab__header">{{ header }}</div>
    <ProjectSettingsGrid :project_info="config.project_info" :new_project="false" />
  </div>
</template>
