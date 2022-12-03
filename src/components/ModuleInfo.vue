<script setup lang="ts">
import * as gomarvin_config from '../assets/ts/gomarvin/interfaces'
import * as editor from '../assets/ts/editor/editor'
import { debug_mode } from '../assets/ts/main'
import { ref, reactive } from 'vue'

// components
import SettingsTabs from './settings/SettingsTabs.vue'
import ModuleToolbar from './ModuleToolbar.vue'
import Endpoint from './endpoint/Endpoint.vue'



defineProps<{
  config: any;
  currentlySelectedModule: string
}>()

const new_endpoint_is_shown = ref(false)
const new_endpoint_fields: gomarvin_config.Endpoint = reactive({
  ...editor.init_endpoint_fields,
})

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

            <transition name="expand--removed">
              <div v-if="new_endpoint_is_shown">
                <Endpoint :existing_controllers="editor.existing_controllers(module.endpoints)"
                  :endpoint="new_endpoint_fields" :new_endpoint="true" @create_new_endpoint="
  editor.CreateEndpointAndResetInputFields(
    module.endpoints,
    new_endpoint_fields,
  );
new_endpoint_is_shown = false
                  " />
              </div>
            </transition>

            <div class="grid grid-cols-[1fr_auto] mt-2">
              <div></div>
              <button @click="new_endpoint_is_shown = !new_endpoint_is_shown" class="flex-center toggle_endpoint_btn">
                {{ new_endpoint_is_shown ? '-' : '+' }}
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
    <SettingsTabs :currentlySelectedModule="currentlySelectedModule" :config="config" />
  </div>
</template>

<style scoped>
.toggle_endpoint_btn {
  width: 30px;
  height: 30px;
  border-radius: var(--border-rad-5);
  border: var(--border-1-3);
  font-size: var(--fs-8);
}

.toggle_endpoint_btn:hover {
  opacity: 1;
  border: var(--border-1-1);
}
</style>
