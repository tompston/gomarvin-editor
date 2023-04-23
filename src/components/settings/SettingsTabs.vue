<script setup lang="ts">
import SettingsProjectTab from '../../components/settings/ProjectCurrent.vue';
import SettingsNewProjectTab from '../../components/settings/ProjectNew.vue';
import SettingsImportConfigTab from '../../components/settings/Import.vue';
import { SETTINGS_TABS } from '../../assets/ts/gomarvin/predefined';
import Export from '../../components/settings/Export.vue';
import ClientTab from './ClientTab.vue';

defineProps<{
  config: any;
  currentlySelectedModule: string;
}>();
</script>

<template>
  <div v-if="currentlySelectedModule == SETTINGS_TABS.CURRENT_PROJECT_TAB.id">
    <SettingsProjectTab :config="config" header="Project Settings" />
  </div>
  <div v-if="currentlySelectedModule == SETTINGS_TABS.NEW_PROJECT_TAB.id">
    <SettingsNewProjectTab :config="config" header="New Project Settings" />
  </div>
  <div v-if="currentlySelectedModule == SETTINGS_TABS.IMPORT_CONFIG_TAB.id">
    <SettingsImportConfigTab :config="config" header="Import Config" />
  </div>
  <div v-if="currentlySelectedModule == SETTINGS_TABS.EXPORT_CONFIG_TAB.id">
    <Export :config="config" header="Export Config" />
  </div>
  <div v-if="currentlySelectedModule == SETTINGS_TABS.CLIENT_CONFIG_TAB.id">
    <ClientTab />
  </div>
</template>
