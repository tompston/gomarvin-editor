<script setup lang="ts">
import * as gomarvin_config from '../../assets/ts/gomarvin/interfaces'
import * as predefined from '../../assets/ts/gomarvin/predefined'
import * as editor from '../../assets/ts/editor/editor'
import * as utils from '../../assets/ts/utils/utils'
import { debug_mode } from '../../assets/ts/main'
import { ref, reactive } from 'vue'
import DeleteSvg from '../utils/svg/DeleteSvg.vue'
import InputErrBox from '../utils/InputErrBox.vue'
import Dropdown1 from '../utils/dropdown/Dropdown1.vue'
// import EndpointBodyField from './EndpointBodyField.vue'
import BodyField from './BodyField.vue'
import UrlParam from './UrlParam.vue'

defineProps<{ endpoint: any; existing_controllers: Array<string>; new_endpoint: boolean }>()
const detailsAreShown = ref(false)
const endpoint_method_dropdown_is_shown = ref(false)
const wantsToDeleteEndpoint = ref(false)

/**
 * here the array holds the string of the name of the event that will be used in the parent component and child compoent
 * @example   parent component == <Endpoint :endpoint="endpoint" @delete_event="c(endpoint)"/>
 * @example   child_component  == <button @click="$emit('delete_event')">Send delete event</button>
 */
defineEmits(['delete_event', 'create_new_endpoint'])

function c(x: any) {
  console.log(x)
}

const new_body_field: gomarvin_config.Body = reactive({ ...editor.init_body_fields })
</script>

<template>
  <div class="endpoint">
    <div class="endpoint__info">
      <!-- Endpoint method -->
      <div class="endpoint__method_input_grid">
        <button class="endpoint__method_selected flex-center disable-text-select"
          :class="'endpoint_method_' + endpoint.method"
          @click="endpoint_method_dropdown_is_shown = !endpoint_method_dropdown_is_shown">{{ endpoint.method }}</button>

        <Dropdown1 :is_shown="endpoint_method_dropdown_is_shown" :options="predefined.HttpMethods"
          :value="endpoint.method"
          @switch="; (endpoint.method = $event), (endpoint_method_dropdown_is_shown = false)" />
      </div>

      <!-- CONTROLLER NAME -->
      <div class="endpoint_input_grid">
        <div>
          <input type="text" class="mevi" placeholder="controller_name" v-model="endpoint.controller_name"
            @input="endpoint.controller_name = utils.ConvertToValidValue($event, utils.ValidControllerName)" />
        </div>
        <InputErrBox msg="Controller name can't be empty!" v-if="endpoint.controller_name == ''" />
        <InputErrBox msg="Controller name already exists!" v-if="
          (editor.duplicateStringExistsInArray(existing_controllers, endpoint.controller_name) &&
            !new_endpoint) ||
          (editor.stringExistsInArray(existing_controllers, endpoint.controller_name) && new_endpoint)
        " />
      </div>

      <!-- URL -->
      <div class="endpoint_input_grid">
        <div>
          <input type="text" class="mevi" v-model="endpoint.url"
            @input="endpoint.url = utils.ConvertToValidValue($event, utils.ValidUrl)" />
          <InputErrBox v-if="utils.lastCharIsInvalidValue(endpoint.url, '/')" msg="Url can't end with / !" />
        </div>
      </div>

      <!-- Endpoint URL param -->
      <div v-for="url_param in endpoint.url_params" v-bind:key="url_param" class="endpoint_input_grid">
        <UrlParam :url_param="url_param" :new_endpoint="new_endpoint" :endpoint="endpoint" />
      </div>

      <!--  -->
      <div v-if="!new_endpoint">
        <div class="qwe">
          <button class="flex-center create__url_param_btn"
            @click="editor.createNewUrlParam(endpoint.url_params)">+</button>
        </div>
      </div>
    </div>

    <button v-if="!new_endpoint" class="endpoint__expander" @click="detailsAreShown = !detailsAreShown">
      <div class="flex-center">
        <svg class="op-70" width="27" height="8" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 1L12.5 15L23 1" stroke="var(--svg-fill)" stroke-width="3.2" />
        </svg>
      </div>
    </button>

    <button v-if="new_endpoint" class="endpoint__expander endpoint__add_btn"
      :disabled="!editor.canCreateNewEndpoint(existing_controllers, endpoint.controller_name)"
      @click="$emit('create_new_endpoint')">
      <div class="flex-center">+</div>
    </button>
  </div>

  <div class="p-2 mt-4" v-if="detailsAreShown">
    <!-- Single Body field -->
    <div>

      <div class="grid gtc-1-auto mb-8 mt-2">
        <div class="fs-6 disable-text-select">Body</div>
        <div v-if="!new_endpoint">
          <div class="flex both-100">
            <div class="flex gap-6 flex-center">

              <transition name="fade">
                <div v-if="wantsToDeleteEndpoint">
                  <button @click="$emit('delete_event')"
                    class="border-1-1 flex flex-center px-12 py-4 border-rad-5 delete_endpoint__btn">
                    <div class="fs-10 fw-600 ">Delete {{ endpoint.controller_name }} endpoint</div>
                  </button>
                </div>
              </transition>
              <button class="flex-center w-24 h-24 temp-main-col-1- border-1-2 height-100 border-rad-5"
                @click="wantsToDeleteEndpoint = !wantsToDeleteEndpoint">
                <DeleteSvg dims="14" fill="black" class="qwe" />
              </button>

            </div>
          </div>
        </div>
      </div>


      <div class="grid gap-8 endpoint__body">
        <!-- Pass down the object that holds the values  -->
        <div v-for="body_param in endpoint.body" :key="body_param">
          <BodyField :existing_body_params="editor.existing_body_params(endpoint.body)" :body_param="body_param"
            :new_endpoint="false" :endpoint="endpoint" />
        </div>

        <div>
          <BodyField :existing_body_params="editor.existing_body_params(endpoint.body)" :body_param="new_body_field"
            :new_endpoint="true" :endpoint="endpoint"
            @create_body_field="editor.CreateBodyFieldAndResetInputFields(endpoint.body, new_body_field)" />
        </div>


      </div>

      <!-- DEBUG GRID -->
      <div class="code flex gap-14 flex-column mt-20" v-if="debug_mode">
        <div>
          <div>existing_body_params</div>
          <div>{{ editor.existing_body_params(endpoint.body) }}</div>
        </div>
        <div>
          <div>existing_url_params</div>
          <div>{{ editor.existing_url_params(endpoint.url_params) }}</div>
        </div>
        <div>
          <div>existing_controllers</div>
          <div>{{ existing_controllers }}</div>
        </div>
        <div>
          <div>endpoint</div>
          <div>{{ endpoint }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
