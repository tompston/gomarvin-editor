<script setup lang="ts">
import Dropdown1 from '../utils/dropdown/Dropdown1.vue';
import * as gomarvin from '../../assets/ts/gomarvin';
import InputErrBox from '../utils/InputErrBox.vue';
import DeleteSvg from '../utils/svg/DeleteSvg.vue';
import { debug_mode } from '../../assets/ts/main';
import * as editor from '../../assets/ts/editor';
import EndpointPanel from './EndpointPanel.vue';
import * as utils from '../../assets/ts/utils';
import BodyField from './BodyField.vue';
import Fetch from './Fetch/Fetch.vue';
import UrlParam from './UrlParam.vue';
import { ref, reactive } from 'vue';

defineProps<{
  endpoint: gomarvin.Endpoint;
  existing_controllers: Array<string>;
  new_endpoint: boolean;
}>();

const detailsAreShown = ref(false);
const endpoint_method_dropdown_is_shown = ref(false);
const wantsToDeleteEndpoint = ref(false);

defineEmits(['delete_event', 'create_new_endpoint']);

const new_body_field: gomarvin.Body = reactive({ ...editor.init_body_fields });

const tabs = ['Fetch', 'Body', 'Response Type', 'Delete'];
const currently_selected_tab = ref<string>(tabs[0]);
</script>

<template>
  <div class="endpoint">
    <div class="grid grid-cols-1 overflow-y-auto---">
      <div class="endpoint__info">
        <!-- Endpoint method -->
        <div >
          <button
            class="endpoint__method_selected flex-center disable-text-select"
            :class="'endpoint_method_' + endpoint.method"
            @click="
              endpoint_method_dropdown_is_shown = !endpoint_method_dropdown_is_shown
            "
          >
            {{ endpoint.method }}
          </button>

          <Dropdown1
            :is_shown="endpoint_method_dropdown_is_shown"
            :options="gomarvin.HttpMethods"
            :value="endpoint.method"
            @switch="
              (endpoint.method = $event), (endpoint_method_dropdown_is_shown = false)
            "
          />
        </div>

        <!-- CONTROLLER NAME -->
        <div class="h-full">
          <div>
            <input
              type="text"
              class="mevi"
              placeholder="controller_name"
              v-model="endpoint.controller_name"
              @input="
                endpoint.controller_name = utils.ConvertToValidValue(
                  $event,
                  utils.ValidControllerName,
                )
              "
            />
          </div>
          <InputErrBox
            msg="Controller can't be named - this!"
            v-if="endpoint.controller_name == 'this'"
          />
          <InputErrBox
            msg="Controller name can't be empty!"
            v-if="endpoint.controller_name == ''"
          />
          <InputErrBox
            msg="Controller name already exists!"
            v-if="
              (editor.duplicateStringExistsInArray(
                existing_controllers,
                endpoint.controller_name,
              ) &&
                !new_endpoint) ||
              (editor.stringExistsInArray(
                existing_controllers,
                endpoint.controller_name,
              ) &&
                new_endpoint)
            "
          />
        </div>

        <!-- URL -->
        <div class="h-full">
          <div>
            <input
              type="text"
              class="mevi"
              v-model="endpoint.url"
              @input="endpoint.url = utils.ConvertToValidValue($event, utils.ValidUrl)"
            />
            <InputErrBox
              v-if="utils.lastCharIsInvalidValue(endpoint.url, '/')"
              msg="Url can't end with / !"
            />
          </div>
        </div>

        <!-- Endpoint URL param -->
        <div
          v-for="(url_param, index) in endpoint.url_params"
          v-bind:key="index"
          class="h-full"
        >
          <UrlParam
            :url_param="url_param"
            :new_endpoint="new_endpoint"
            :endpoint="endpoint"
          />
        </div>

        <!--  -->
        <div v-if="!new_endpoint">
          <div >
            <button
              class="flex-center opacity-40 create__url_param_btn fs-9 border-rad-5 w-[20px] h-[20px] selected-bg-col-2 hover:opacity-80"
              @click="editor.createNewUrlParam(endpoint.url_params)"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="!new_endpoint"
      class="endpoint__expander"
      @click="detailsAreShown = !detailsAreShown"
    >
      <div class="flex-center">
        <svg
          class="opacity-30"
          width="27"
          height="8"
          viewBox="0 0 25 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 1L12.5 15L23 1" stroke="var(--svg-fill)" stroke-width="3" />
        </svg>
      </div>
    </button>

    <div v-if="new_endpoint" class="endpoint__expander">
      <button
        class="endpoint__add_btn w-7 h-7 flex-center"
        :disabled="
          !editor.canCreateNewEndpoint(existing_controllers, endpoint.controller_name)
        "
        @click="$emit('create_new_endpoint')"
      >
        +
      </button>
    </div>
  </div>

  <transition name="fade">
    <div class="p-[2px] mt-[12px] mb-[8px] min-h-[330px]" v-if="detailsAreShown">
      <div class="flex gap-2 mb-5">
        <div v-for="tab in tabs">
          <button
            :class="{
              'selected-value-1': currently_selected_tab === tab,
              'bg-light-select-1---': currently_selected_tab !== tab,
            }"
            class="py-[3px] px-2.5 text-[10px] fw-700 border-rad-5 border-1-3 uppercase"
            @click="currently_selected_tab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Single Body field -->
      <div class="mb-[10px] grid gap-6">
        <div v-if="currently_selected_tab === 'Body'">
          <EndpointPanel header="Body">
            <div class="endpoint_body_grid fs-10 fw-700 opacity-50 mb-1">
              <div>FIELD</div>
              <div>TYPE</div>
              <div class="flex gap-1.5">
                <div>VALIDATE</div>
                <a
                  href="https://github.com/go-playground/validator"
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >
                  <div
                    class="text-[9px] round bg-black text-white w-3 h-3 flex-center disable-text-select"
                  >
                    ?
                  </div>
                </a>
              </div>
            </div>
            <div class="grid gap-[8px] endpoint__body">
              <!-- Pass down the object that holds the values  -->
              <div v-for="body_param in endpoint.body" :key="JSON.stringify(body_param)">
                <BodyField
                  :existing_body_params="editor.existing_body_params(endpoint.body)"
                  :body_param="body_param"
                  :new_endpoint="false"
                  :endpoint="endpoint"
                />
              </div>

              <div>
                <BodyField
                  :existing_body_params="editor.existing_body_params(endpoint.body)"
                  :body_param="new_body_field"
                  :new_endpoint="true"
                  :endpoint="endpoint"
                  @create_body_field="
                    editor.CreateBodyFieldAndResetInputFields(
                      endpoint.body,
                      new_body_field,
                    )
                  "
                />
              </div>
            </div>
          </EndpointPanel>
        </div>

        <div v-if="currently_selected_tab === 'Fetch'">
          <EndpointPanel header="Fetch">
            <Fetch :endpoint="endpoint" />
          </EndpointPanel>
        </div>

        <div v-if="currently_selected_tab === 'Response Type'">
          <EndpointPanel header="Response Type">
            <div class="mb-2">
              <div class="flex flex-row gap-2">
                <div
                  class="settings__multiple_choices_grid_option"
                  :class="
                    endpoint.response_type === gomarvin.ResponseTypes.default
                      ? 'currently_selected_multiple_choices_option'
                      : ''
                  "
                  @click="endpoint.response_type = gomarvin.ResponseTypes.default"
                >
                  Default
                </div>
                <div
                  class="settings__multiple_choices_grid_option"
                  :class="
                    endpoint.response_type === gomarvin.ResponseTypes.with_pagination
                      ? 'currently_selected_multiple_choices_option'
                      : ''
                  "
                  @click="endpoint.response_type = gomarvin.ResponseTypes.with_pagination"
                >
                  With Pagination
                </div>
              </div>
            </div>
          </EndpointPanel>
        </div>

        <div v-if="currently_selected_tab === 'Delete'">
          <EndpointPanel header="Delete">
            <div class="grid grid-cols-[1fr_auto] mt-[2px]">
              <div v-if="!new_endpoint">
                <div class="flex w-full h-full">
                  <div class="flex gap-[8px] flex-center">
                    <button
                      class="flex-center w-[26px] h-[26px] border-1-2 border-rad-5"
                      @click="wantsToDeleteEndpoint = !wantsToDeleteEndpoint"
                    >
                      <DeleteSvg dims="14" fill="var(--svg-fill)"  />
                    </button>
                    <transition name="fade">
                      <div v-if="wantsToDeleteEndpoint">
                        <button
                          @click="$emit('delete_event')"
                          class="border-1-2 flex flex-center px-[12px] py-[3px] border-rad-5 delete_endpoint__btn hover:bg-red-600 transition-colors hover:text-white hover:border-white/0"
                        >
                          <div class="fs-10 fw-600">
                            Delete {{ endpoint.controller_name }} endpoint
                          </div>
                        </button>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </div>
          </EndpointPanel>
        </div>

        <!-- DEBUG GRID -->
        <div class="code flex gap-[14px] flex-col mt-[20px]" v-if="debug_mode">
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
  </transition>
</template>
