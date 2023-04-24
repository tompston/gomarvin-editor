<script setup lang="ts">
import LoadingSpinner from '../utils/svg/LoadingSpinner.vue';
import * as gomarvin from '../../assets/ts/gomarvin';
import FetchResponse from './FetchResponse.vue';
import * as utils from '../../assets/ts/utils';
import { ref } from 'vue';

const props = defineProps<{
  endpoint: gomarvin.Endpoint;
}>();

const appended_url = ref<string>('');
const urlParams = ref(props.endpoint.url_params);
const bodyParams = ref(props.endpoint.body);
const urlParamsValues = ref(urlParams.value.map(() => ''));
const bodyParamsValues = ref(bodyParams.value.map(() => ''));

const client: gomarvin.Client = utils.getClient();
console.log(client);

//
const is_fetching = ref(false);
const is_error = ref(false);
const endpoint_response = ref<any>();
const error_message = ref('');

async function handleSubmit() {
  let url = `${client.host_url}${client.api_prefix}${props.endpoint.url}`;
  console.log(url);

  urlParams.value.forEach((param, index) => {
    url = url + '/' + urlParamsValues.value[index];
  });

  const computed_body = JSON.stringify(
    bodyParams.value.reduce((acc, param, index) => {
      // @ts-ignore
      acc[param.field] = bodyParamsValues.value[index];
      return acc;
    }, {}),
  );

  if (appended_url.value === '') {
    appended_url.value = ' ';
  }

  is_fetching.value = true;
  is_error.value = false;
  const response = await fetch(url.toString(), {
    method: props.endpoint.method,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    headers: client.headers,
    // body: JSON.stringify(
    //   bodyParams.value.reduce((acc, param, index) => {
    //     // @ts-ignore
    //     acc[param.field] = bodyParamsValues.value[index];
    //     return acc;
    //   }, {}),
    // ),
  });

  if (response.ok) {
    is_fetching.value = false;
    const data = await response.json();
    endpoint_response.value = data;
    console.log(data);
  } else {
    is_fetching.value = false;
    is_error.value = true;
    console.error('Error:', response.statusText);
  }
}
</script>

<template>
  <div class="">
    <!-- {{ endpoint }} -->

    <form @submit.prevent="handleSubmit" class="grid grid-cols-[1fr_auto]">
      <div class="">
        <div class="grid">
          <!-- url -->
          <div class="grid grid-cols-[1fr_auto_auto] overflow-auto mb-2">
            <div class="flex gap-2">
              <!-- <div class="fetch_input_box">
                <label for="endpoint-url-path" class="fetch_label">url</label>
                <div class="" id="endpoint-url-path">
                  {{ endpoint.url }}
                </div>
              </div> -->
              <!-- url path params -->
              <div
                v-for="(urlParam, index) in urlParams"
                :key="index"
                class="fetch_input_box"
              >
                <label :for="urlParam.field" class="fetch_label">{{
                  urlParam.field
                }}</label>
                <div class="flex flex-wrap">
                  <div class="flex gap-2">
                    <div>/</div>
                    <input
                      class="bg-transparent"
                      :id="urlParam.field"
                      :type="urlParam.type"
                      :placeholder="urlParam.field"
                      v-model="urlParamsValues[index]"
                      required="true"
                    />
                  </div>
                </div>
              </div>
              <div class="fetch_input_box">
                <label for="urlParam_appended_url" class="fetch_label">
                  optional values
                </label>
                <div>
                  <div>
                    <input
                      class="bg-transparent"
                      id="urlParam_appended_url"
                      type="text"
                      placeholder="?name=tom"
                      v-model="appended_url"
                      required="false"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flex gap-3">
                <div v-if="is_fetching" class="flex-center opacity-60">
                  <LoadingSpinner />
                </div>

                <button
                  type="submit"
                  class="border-1-2 py-2 px-4 text-[11px] fw-700 border-rad-5"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-2">
          <div v-for="(bodyParam, index) in bodyParams" :key="index">
            <div class="flex flex-col">
              <label :for="bodyParam.field" class="fetch_label">{{
                bodyParam.field
              }}</label>
              <input
                class="bg-transparent border-1-2---"
                :id="bodyParam.field"
                v-model="bodyParamsValues[index]"
                :placeholder="bodyParam.type"
                :required="bodyParam.validate === 'required'"
              />
            </div>
          </div>
        </div>
      </div>
    </form>

    <FetchResponse :data="endpoint_response" />
  </div>
</template>

<style>
.fetch_input_box {
  /* border-radius: var(--border-rad-5); */
  /* border: var(--border-1-3); */
  flex-direction: column;
  display: flex;
}

.fetch_label {
  background-color: var(--bg-light-select-1);
  /* background-color: var(--bg-light-select-1); */
  /* border-radius: var(--border-rad-5); */
  padding: 6px 12px;
  font-weight: 600;
  font-size: 11px;
}
</style>
