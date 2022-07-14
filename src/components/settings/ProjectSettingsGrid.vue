<script setup lang="ts">
import * as utils from '../../assets/ts/utils/utils'
import * as predefined from '../../assets/ts/gomarvin/predefined'
import * as editor from '../../assets/ts/editor/editor'
import { debug_mode } from '../../assets/ts/main'
import { ref } from 'vue'
import Dropdown1 from '../utils/dropdown/Dropdown1.vue'
import InputErrBox from '../utils/InputErrBox.vue'

defineProps<{ project_info: any; new_project: boolean }>()

const db_dropdown_is_shown = ref(false)
const gomarvin_v_dropdown_is_shown = ref(false)
const go_v_dropdown_is_shown = ref(false)
const framework_dropdown_is_shown = ref(false)
</script>

<template>
  <div class="project-settings-header">Main</div>
  <div class="settings__project_info">
    <!-- Fixed  project name -->
    <div class="settings__project_info_value_label_grid">
      <div class="settings__project_info_label">name</div>
      <div class="settings__project_info_value">
        <input placeholder="project_name" class="settings__project_info_input" type="text" v-model="project_info.name"
          :disabled="!new_project"
          @input="project_info.name = utils.ConvertToValidValue($event, utils.ValidProjectName)" />
        <InputErrBox msg="Project name can't be empty!" v-if="project_info.name == ''" />
      </div>
    </div>

    <!-- Fixed framework -->
    <div class="settings__project_info_value_label_grid">
      <div class="settings__project_info_label">framework</div>
      <div class="settings__project_info_value ">
        <div @click="framework_dropdown_is_shown = !framework_dropdown_is_shown" class="settings__project_info_input">{{
            project_info.framework
        }}</div>
        <Dropdown1 v-if="new_project" :is_shown="framework_dropdown_is_shown" :options="predefined.Frameworks"
          :value="project_info.framework"
          @switch="; (project_info.framework = $event), (framework_dropdown_is_shown = false)" />
      </div>
    </div>
    <div class="settings__project_info_value_label_grid">
      <div class="settings__project_info_label">port</div>
      <div class="settings__project_info_value">
        <div>
          <input class="settings__project_info_input" placeholder="4444" type="text" v-model="project_info.port"
            @input="project_info.port = utils.ConvertToValidValue($event, utils.ValidPort)" />
          <InputErrBox msg="Port should not be empty!" v-if="project_info.port == ''" />
        </div>
      </div>
    </div>
    <div class="settings__project_info_value_label_grid">
      <div class="settings__project_info_label">api_prefix</div>
      <div class="settings__project_info_value">
        <div>
          <input class="settings__project_info_input" type="text" v-model="project_info.api_prefix"
            @input="project_info.api_prefix = utils.ConvertToValidValue($event, utils.ValidApiPrefix)" />
          <InputErrBox msg="api_prefix should not end with / !"
            v-if="utils.lastCharIsInvalidValue(project_info.api_prefix, '/')" />
          <InputErrBox msg="api_prefix shold be at least 3 chars long!" v-if="project_info.api_prefix.length <= 2" />
        </div>
      </div>
    </div>
    <div class="settings__project_info_value_label_grid">
      <div class="settings__project_info_label">config_version</div>
      <div class="settings__project_info_value">
        <input class="settings__project_info_input" placeholder="0.1" type="text" v-model="project_info.config_version"
          @input="project_info.config_version = utils.ConvertToValidValue($event, utils.ValidConfigVersion)" />

        <InputErrBox msg="Config version can't be empty!" v-if="project_info.config_version == ''" />
        <InputErrBox msg="Config version should be a float!"
          v-if="!editor.isFloat(project_info.config_version) || project_info.config_version.length <= 2" />
      </div>
    </div>

    <!-- Switchable db_type -->
    <div class="settings__project_info_value_label_grid">
      <div class="settings__project_info_label">db_type</div>
      <div class="settings__project_info_value">
        <div class="settings__project_info_input" @click="db_dropdown_is_shown = !db_dropdown_is_shown">{{
            project_info.db_type
        }}</div>
        <Dropdown1 :is_shown="db_dropdown_is_shown" :options="predefined.DbTypes" :value="project_info.db_type"
          @switch="; (project_info.db_type = $event), (db_dropdown_is_shown = false)" />
      </div>
    </div>

    <!-- Switchable gomarvin_version -->
    <div class="settings__project_info_value_label_grid">
      <div class="settings__project_info_label">gomarvin_version</div>
      <div class="settings__project_info_value">
        <div class="settings__project_info_input" @click="gomarvin_v_dropdown_is_shown = !gomarvin_v_dropdown_is_shown">
          {{ project_info.gomarvin_version }}
        </div>
        <Dropdown1 :is_shown="gomarvin_v_dropdown_is_shown" :options="predefined.GomarvinVersions"
          :value="project_info.gomarvin_version"
          @switch="; (project_info.gomarvin_version = $event), (gomarvin_v_dropdown_is_shown = false)" />
      </div>
    </div>

    <!-- Switchable Go Version -->
    <div class="settings__project_info_value_label_grid">
      <div class="settings__project_info_label">go_version</div>
      <div class="settings__project_info_value">
        <div class="settings__project_info_input" @click="go_v_dropdown_is_shown = !go_v_dropdown_is_shown">{{
            project_info.go_version
        }}</div>
        <Dropdown1 :is_shown="go_v_dropdown_is_shown" :options="predefined.GoVersions" :value="project_info.go_version"
          @switch="; (project_info.go_version = $event), (go_v_dropdown_is_shown = false)" />
      </div>
    </div>
  </div>
  <!-- Optional params that will change the generated project after the first run -->
  <div class="mt-[16px]">
    <div class="project-settings-header">Optional</div>
    <div class="settings__project_info-- flex gap-[30px]">
      <!-- include_sql switch -->
      <div class="settings__project_info_value_label_grid">
        <div class="settings__project_info_label">include_sql</div>
        <div class="settings__project_info_value">
          <div class="settings__multiple_choices_grid">
            <button class="settings__multiple_choices_grid_option"
              :class="project_info.include_sql == true ? 'currently_selected_multiple_choices_option' : ''"
              @click="project_info.include_sql = true">true</button>
            <button class="settings__multiple_choices_grid_option"
              :class="project_info.include_sql == false ? 'currently_selected_multiple_choices_option' : ''"
              @click="project_info.include_sql = false">false</button>
          </div>
        </div>
      </div>

      <!-- include_ts_fetch -->
      <div class="settings__project_info_value_label_grid">
        <div class="settings__project_info_label">include_ts_fetch</div>
        <div class="settings__project_info_value">
          <div class="settings__multiple_choices_grid ">
            <button class="settings__multiple_choices_grid_option"
              :class="project_info.include_ts_fetch == true ? 'currently_selected_multiple_choices_option' : ''"
              @click="project_info.include_ts_fetch = true">true</button>
            <button class="settings__multiple_choices_grid_option"
              :class="project_info.include_ts_fetch == false ? 'currently_selected_multiple_choices_option' : ''"
              @click="project_info.include_ts_fetch = false">false</button>
          </div>
        </div>
      </div>

      <div></div>
    </div>

    <!--  -->
    <div class="code" v-if="debug_mode">{{ project_info }}</div>
  </div>
</template>

<style>
.settings__project_info {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

/* .settings__project_info_value_label_grid {
  display: grid;
  grid-template-rows: auto auto;
} */
.settings__project_info_label {
  font-size: var(--fs-8);
  margin-bottom: 5px;
  opacity: 0.6;
}

.settings__project_info_value,
.settings__project_info_input {
  font-size: var(--fs-7);

}

.settings__project_info_input {
  padding: 0px;
  /* border: var(--border-1-2); */
  border-radius: var(--border-rad-5);
  background-color: var(--code-bg);
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  height: 100%;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: var(--fs-9);
  /* opacity: 0.9; */
}

.settings__project_info_value {
  min-height: 40px;
}

.settings__multiple_choices_grid {
  display: flex;
  gap: 7px;
}
</style>