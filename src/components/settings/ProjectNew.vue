<script setup lang="ts">
import * as gomarvin_config from "../../assets/ts/gomarvin/interfaces";
import { init_project_info } from "../../assets/ts/editor/init";
import ProjectSettingsGrid from "./ProjectSettingsGrid.vue";
import { ref, reactive } from "vue";

defineProps<{ config: any; header: string }>();

const new_project_settings: gomarvin_config.ProjectInfo = reactive(init_project_info);

const new_gomarvin_project: gomarvin_config.Config = reactive({
  project_info: new_project_settings,
  modules: [],
});

function createNewProject(config: any) {
  Object.assign(config, new_gomarvin_project);
}

const wantsToCreateNewProject = ref(false);
</script>

<template>
  <div class="tab__header">{{ header }}</div>

  <ProjectSettingsGrid :project_info="new_project_settings" :new_project="true" />

  <!--  -->
  <div class="flex-center w-full mt-[30px]">
    <button class="create_project_btn" @click="wantsToCreateNewProject = !wantsToCreateNewProject">
      CREATE NEW PROJECT
    </button>
  </div>

  <!-- Modal -->
  <transition name="fade">
    <div v-if="wantsToCreateNewProject">
      <div class="modal__overlay" @click="wantsToCreateNewProject = false"></div>
      <div class="modal__content max-w-[450px]">
        <div class="p-[26px] w-full h-full text-center">
          <div class="modal__header">Really want to create a new project?</div>
          <div class="fs-8 py-[14px]">
            Note that this will delete the previous project and all progress will be lost!
          </div>
          <div class="flex w-full gap-[6px]">
            <button class="modal__btn" @click="
              createNewProject(config);
              wantsToCreateNewProject = false;
            ">
              Yes
            </button>
            <button class="modal__btn" @click="wantsToCreateNewProject = false">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
