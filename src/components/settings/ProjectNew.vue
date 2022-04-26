<script setup lang="ts">
import * as gomarvin_config from '../../assets/ts/gomarvin/interfaces'
import * as predefined from '../../assets/ts/gomarvin/predefined'
import { init_project_info } from "../../assets/ts/editor/init"
import ProjectSettingsGrid from './ProjectSettingsGrid.vue'
import { ref, reactive } from 'vue'


defineProps<{ config: any, header: string }>()


const new_project_settings: gomarvin_config.ProjectInfo = reactive(init_project_info)

const new_gomarvin_project: gomarvin_config.Config = reactive({
  project_info: new_project_settings,
  modules: []
})

function createNewProject(config: any) {
  Object.assign(config, new_gomarvin_project)
}

const wantsToCreateNewProject = ref(false)

</script>

<template>
  <div class="tab--header">{{ header }}</div>

  <ProjectSettingsGrid :project_info="new_project_settings" :new_project="true" />

  <!--  -->
  <div class="flex-center width-100 mt-30">
    <button
      class="create_project_btn py-10 px-12 fw-700 border-rad-4 fs-10"
      @click="wantsToCreateNewProject = !wantsToCreateNewProject"
    >CREATE NEW PROJECT</button>
  </div>

  <!-- Modal -->
  <transition name="fade">
    <div v-if="wantsToCreateNewProject">
      <div class="modal__overlay" @click="wantsToCreateNewProject = false"></div>
      <div class="modal__content max-w-450">
        <div class="p-26 both-100">
          <div class="fs-4">Really want to create a new project?</div>
          <div
            class="fs-7 py-14"
          >Note that this will delete the previous project and all progress will be lost</div>
          <div class="flex width-100 gap-6">
            <button
              class="create_new_project_btn"
              @click="createNewProject(config); wantsToCreateNewProject = false"
            >Yes</button>
            <button class="create_new_project_btn" @click="wantsToCreateNewProject = false">No</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

