<script setup lang="ts">
import * as gomarvin_config from "../assets/ts/gomarvin/interfaces";
import * as editor from "../assets/ts/editor/editor";
import ModuleToolbar from "./ModuleToolbar.vue";
import { debug_mode } from "../assets/ts/main";
import Endpoint from "./endpoint/Endpoint.vue";
import { ref, reactive } from "vue";

// settings tabs components
import { SETTINGS_TABS } from "../assets/ts/gomarvin/predefined";
import SettingsProjectTab from "../components/settings/ProjectCurrent.vue";
import SettingsNewProjectTab from "../components/settings/ProjectNew.vue";
import SettingsImportConfigTab from "../components/settings/Import.vue";
import Export from "../components/settings/Export.vue";

defineProps<{ config: any; currentlySelectedModule: string }>();

const new_endpoint_fields: gomarvin_config.Endpoint = reactive({
  ...editor.init_endpoint_fields,
});

const new_endpoint_is_shown = ref(false)

</script>

<template>
  <div class="mb-[70px] editor__right">
    <!-- Module tabs -->
    <div v-for="module in config.modules" v-bind:key="module">
      <div class="current-module-tab" v-if="currentlySelectedModule == module.name">
        <!-- Endpoinnt Toolbar row -->
        <ModuleToolbar :module="module" :config="config" />

        <div class="grid">
          <!-- Grid of endpoints -->
          <div v-for="endpoint in editor.endpoints_sorted_by_http_method(module.endpoints)" v-bind:key="endpoint">
            <Endpoint :existing_controllers="editor.existing_controllers(module.endpoints)" :endpoint="endpoint"
              :new_endpoint="false" @delete_event="editor.deleteValueFromArray(module.endpoints, endpoint)" />
          </div>

          <div>
            <div v-if="new_endpoint_is_shown">
              <Endpoint :existing_controllers="editor.existing_controllers(module.endpoints)"
                :endpoint="new_endpoint_fields" :new_endpoint="true" @create_new_endpoint="
  editor.CreateEndpointAndResetInputFields(
    module.endpoints,
    new_endpoint_fields
  );
new_endpoint_is_shown = false
                " />
            </div>

            <div class="grid grid-cols-[1fr_auto] mt-2">
              <div></div>
              <button @click="new_endpoint_is_shown = !new_endpoint_is_shown" class="flex-center toggle_endpoint_btn">
                {{ new_endpoint_is_shown ? "-" : "+" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="code mt-[16px]" v-if="debug_mode">
      <div class="mb-[4px]">new_endpoint_fields</div>
      <div>{{ new_endpoint_fields }}</div>
    </div>

    <!-- Settings tabs -->
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
  </div>
</template>

<style scoped>
.toggle_endpoint_btn {
  width: 30px;
  height: 30px;
  border-radius: var(--border-rad-5);
  border: var(--border-1-3);
  font-size: var(--fs-8);
  margin-right: 5px;
}

.toggle_endpoint_btn:hover {
  opacity: 1;
  border: var(--border-1-1);
}
</style>