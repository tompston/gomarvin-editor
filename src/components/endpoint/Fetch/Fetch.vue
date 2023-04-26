<script setup lang="ts">
import LoadingSpinner from '../../utils/svg/LoadingSpinner.vue';
import * as gomarvin from '../../../assets/ts/gomarvin';
import * as utils from '../../../assets/ts/utils';
import Table from './Table/Table.vue';
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
// console.log(client);

//
const is_fetching = ref(false);
const is_error = ref(false);
const endpoint_response = ref<any>();
const error_message = ref('');

const computed_body = JSON.stringify(
  bodyParams.value.reduce((acc, param, index) => {
    // @ts-ignore
    acc[param.field] = bodyParamsValues.value[index];
    return acc;
  }, {}),
);

async function handleSubmit() {
  try {
    error_message.value = '';
    let url = `${client.host_url}${client.api_prefix}${props.endpoint.url}`;
    console.log(url);

    urlParams.value.forEach((param, index) => {
      url = url + '/' + urlParamsValues.value[index];
    });

    if (appended_url.value === '') {
      appended_url.value = ' ';
    }

    is_fetching.value = true;
    is_error.value = false;
    const response = await fetch(url.toString(), {
      method: props.endpoint.method,
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
      error_message.value = `STATUS CODE ${response.status}`;
    }
  } catch (error) {
    is_fetching.value = false;
    is_error.value = true;
    error_message.value = `${error}`;
    console.error('Error:', error);
  }
}
</script>

<template>
  <div>
    <!-- {{ endpoint }} -->

    <!-- <div>computed_body:: {{ computed_body }}</div> -->

    <form @submit.prevent="handleSubmit" class="grid grid-cols-[1fr_auto]">
      <div class="grid gap-2">
        <div class="grid">
          <!-- url -->
          <div class="header___3">Url</div>
          <hr class="border mb-2" />
          <div class="grid grid-cols-[1fr_auto_auto] overflow-auto mb-2 gap-2">
            <div class="flex gap-2">
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
              <div class="fetch_input_box w-full">
                <label for="urlParam_appended_url" class="fetch_label">
                  optional values
                </label>
                <div>
                  <div>
                    <input
                      class="bg-transparent w-full"
                      id="urlParam_appended_url"
                      type="text"
                      placeholder="?name=tom"
                      v-model="appended_url"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="grid gap-3 grid-cols-[20px_1fr] min-w-[100px]">
                <div class="flex-center">
                  <div v-if="is_fetching && !is_error" class="flex-center opacity-60">
                    <LoadingSpinner />
                  </div>
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

        <div v-if="endpoint.body.length != 0">
          <div class="header___3">Body</div>
          <hr class="border mb-2" />
          <div class="grid grid-cols-1 overflow-auto">
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
        </div>
      </div>
    </form>

    <div v-if="error_message != ''">
      <div class="flex-center mt-3">
        <div class="bg-red-600 text-white px-3 py-1.5 border-rad-5 text-[11px] fw-700">
          <span>{{ error_message }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 overflow-auto">
      <div class="container max-h-[370px]">
        <div v-if="endpoint_response">
          <Table :data="endpoint_response" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fetch_input_box {
  flex-direction: column;
  display: flex;
}

.fetch_label {
  background-color: var(--bg-light-select-1);
  border-radius: var(--border-rad-5);
  padding: 5px 0px 5px 14px;
  font-weight: 600;
  font-size: 11px;
  display: flex;
}

.header___3 {
  /* border-bottom: 1px solid white; */
  font-size: var(--fs-9);
  margin-bottom: 8px;
  font-weight: 700;
}
</style>
