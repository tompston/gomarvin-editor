<script setup lang="ts">
import { ref, reactive, watchEffect, onMounted } from 'vue'
import { saveConfigToLocalStorage, getConfig, publicConfigExists } from '../assets/ts/utils/utils'
import { debug_mode, debug_grid_shown } from '../assets/ts/main'
import { SETTINGS_TABS } from '../assets/ts/gomarvin/predefined'
import * as gomarvin_config from '../assets/ts/gomarvin/interfaces'
import * as editor from '../assets/ts/editor/editor'
import * as utils from '../assets/ts/utils/utils'
import Header from './Header.vue'
import ModuleInfo from './ModuleInfo.vue'


let stored_config = getConfig()
const config = reactive((stored_config))
const createNewModuleDropdownIsShown = ref(false)
const currentlySelectedModule = ref(module_name())
const newModuleName = ref('')
const new_endpoint_fields: gomarvin_config.Endpoint = reactive({ ...editor.init_endpoint_fields })

function module_name(): string {
  let existing_modules = editor.existing_module_names(config.modules)
  if (existing_modules.length != 0) {
    return existing_modules[0]
  }
  return ''
}


function debug() { }

onMounted(async () => {
  console.log(getConfig())
})

//  Save config to localstorage when it is changed
watchEffect(() => {
  saveConfigToLocalStorage(config)
})

</script>


<template>
  <Header />

  <div class="flex-center">
    <div class="max-width-1 pb-[100px]">
      <div class="editor">
        <div class="editor__left">
          <div class="flex flex-col">
            <!-- Modules Navigation grid -->
            <div class="navigation--section">
              <div class="navigation--header">Modules</div>
              <div class="navigation--options">
                <div v-for="module in config.modules" v-bind:key="module" class="navigation--option">
                  <button @click="currentlySelectedModule = module.name" class="module__name_btn"
                    :class="currentlySelectedModule == module.name ? 'module__name_btn--selected' : ''">{{
                        module.name
                    }}</button>
                </div>
                <div class="navigation--option">
                  <button class="module__name_btn"
                    @click="createNewModuleDropdownIsShown = !createNewModuleDropdownIsShown">+</button>
                </div>
                <div>
                  <div v-if="createNewModuleDropdownIsShown">
                    <div class="flex flex-col my-[10px] max-w-[120px] create-new-module-grid">
                      <input type="text" class="mevi max-w-full" placeholder="Singular Module" v-model="newModuleName"
                        @input="newModuleName = utils.ConvertToValidValue($event, utils.ValidModuleName)" />
                      <div class="flex-center">
                        <button @click="
                          editor.createNewModule(config.modules, newModuleName),
                          (newModuleName = ''),
                          (createNewModuleDropdownIsShown = false)
                        " class="fs-10 fw-700 flex-center w-full h-full mt-[6px] py-[6px] add_new_module_btn"
                          :disabled="!editor.module_name_is_valid(config.modules, newModuleName)">ADD</button>
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
                <div v-for="SETTINGS_TAB in SETTINGS_TABS" v-bind:key="SETTINGS_TAB.id">
                  <button @click="currentlySelectedModule = SETTINGS_TAB.id" class="module__name_btn"
                    :class="currentlySelectedModule == SETTINGS_TAB.id ? 'module__name_btn--selected' : ''">{{
                        SETTINGS_TAB.label
                    }}</button>
                </div>

                <!-- <div>
                    <button class="module__name_btn" @click="utils.saveDataToJsonFile(config)">Save</button>
                  </div> -->

              </div>
            </div>
          </div>
        </div>

        <!-- editor__right -->
        <ModuleInfo :config="config" :currentlySelectedModule="currentlySelectedModule" />
        <!--  -->
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
</template>


