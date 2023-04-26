<script setup lang="ts">
import { ref, reactive, watchEffect, onMounted } from 'vue';
import { debug_grid_shown } from '../assets/ts/main';
import * as gomarvin from '../assets/ts/gomarvin';
import * as editor from '../assets/ts/editor';
import * as utils from '../assets/ts/utils';
import ModuleInfo from './ModuleInfo.vue';
import Header from './Header.vue';

const props = defineProps({
  config: Object,
});

// let stored_config = utils.getConfig();
const config = reactive<any>(props.config);
const createNewModuleDropdownIsShown = ref(false);
const currentlySelectedModule = ref(module_name());
const newModuleName = ref('');
const new_endpoint_fields: gomarvin.Endpoint = reactive({
  ...editor.init_endpoint_fields,
});

function module_name(): string {
  let existing_modules = editor.existing_module_names(config.modules);
  if (existing_modules.length != 0) {
    return existing_modules[0];
  }
  return '';
}

function debug() {}

// onMounted(async () => {
//   console.log(utils.getConfig());
// });

//  Save config to localstorage when it is changed
watchEffect(() => {
  utils.saveConfigToLocalStorage(utils.localStorageCongigKey, config);
});
</script>

<template>
  <Header />

  <div v-if="config">
    <div class="flex-center">
      <div class="max-width-1 pb-[100px]">
        <div class="editor">
          <div>
            <div class="flex flex-col">
              <!-- Modules Navigation grid -->
              <div class="navigation--section">
                <div class="navigation--header">Modules</div>
                <div class="navigation--options">
                  <div
                    v-for="module in config.modules"
                    v-bind:key="module"
                    class="overflow-auto"
                  >
                    <button
                      @click="currentlySelectedModule = module.name"
                      class="module__name_btn"
                      :id="module.name"
                      :class="
                        currentlySelectedModule == module.name ? 'selected-value-1' : ''
                      "
                    >
                      {{ module.name }}
                    </button>
                  </div>
                  <div class="overflow-auto">
                    <button
                      class="module__name_btn"
                      @click="
                        createNewModuleDropdownIsShown = !createNewModuleDropdownIsShown
                      "
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <div v-if="createNewModuleDropdownIsShown">
                      <div
                        class="flex flex-col my-[10px] max-w-[120px] create-new-module-grid"
                      >
                        <input
                          type="text"
                          class="mevi max-w-full"
                          placeholder="Singular Module"
                          v-model="newModuleName"
                          @input="
                            newModuleName = utils.ConvertToValidValue(
                              $event,
                              utils.ValidModuleName,
                            )
                          "
                        />
                        <div class="flex-center">
                          <button
                            @click="
                              editor.createNewModule(config.modules, newModuleName),
                                (newModuleName = ''),
                                (createNewModuleDropdownIsShown = false)
                            "
                            class="fs-10 fw-700 flex-center w-full h-full mt-[6px] py-[6px] border-1-2 border-rad-4"
                            :disabled="
                              !editor.module_name_is_valid(config.modules, newModuleName)
                            "
                          >
                            ADD
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!--  -->
              <div class="navigation--section">
                <div class="navigation--header">Settings</div>
                <div class="navigation--options">
                  <div
                    v-for="SETTINGS_TAB in gomarvin.SETTINGS_TABS"
                    v-bind:key="SETTINGS_TAB.id"
                  >
                    <button
                      @click="currentlySelectedModule = SETTINGS_TAB.id"
                      class="module__name_btn"
                      :class="
                        currentlySelectedModule == SETTINGS_TAB.id
                          ? 'selected-value-1'
                          : ''
                      "
                    >
                      {{ SETTINGS_TAB.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- editor__right -->
          <ModuleInfo
            :config="config"
            :currentlySelectedModule="currentlySelectedModule"
          />
        </div>

        <!-- DEBUG BOX -->
        <div v-if="debug_grid_shown">
          <div class="debug__box">
            <div class="debug__label_value grid">
              <div>currentlySelectedModule</div>
              <div>{{ currentlySelectedModule }}</div>
            </div>
            <button @click="debug()" class="debug__btn">debug()</button>
            <div class="debug__label_value grid">
              <div>newModuleName</div>
              <div>{{ newModuleName }}</div>
            </div>
            <div class="debug__label_value grid">
              <div>new_endpoint_fields</div>
              <div>{{ new_endpoint_fields }}</div>
            </div>
            <div class="debug__label_value grid">
              <div>module_name_is_valid</div>
              <div>{{ editor.module_name_is_valid(config.modules, newModuleName) }}</div>
            </div>
            <div class="debug__config_box">{{ config }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.module__name_btn {
  color: var(--module-name-btn-txt-col);
  font-size: var(--fs-9);
  font-weight: 500;
  border-radius: 5px;
  padding: 2px 9px;
}
</style>
