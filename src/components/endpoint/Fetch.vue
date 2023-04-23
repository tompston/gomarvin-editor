<script setup lang="ts">
import { ref } from 'vue';
import * as gomarvin_config from '../../assets/ts/gomarvin/interfaces';

const props = defineProps<{
  endpoint: gomarvin_config.Endpoint;
}>();

const appended_url = ref<string>('');
const urlParams = ref(props.endpoint.url_params);
const bodyParams = ref(props.endpoint.body);
const urlParamsValues = ref(urlParams.value.map(() => ''));
const bodyParamsValues = ref(bodyParams.value.map(() => ''));

async function handleSubmit() {
  const url = new URL(props.endpoint.url, window.location.origin);

  // urlParams.value.forEach((param, index) => {
  //   url.searchParams.append(param.field, urlParamsValues.value[index]);
  // });

  url.pathname;

  urlParams.value.forEach((param, index) => {
    url.pathname = url.pathname + '/' + urlParamsValues.value[index];
    // url.pathname.append(param.field, urlParamsValues.value[index]);
  });

  const computed_body = JSON.stringify(
    bodyParams.value.reduce((acc, param, index) => {
      // @ts-ignore
      acc[param.field] = bodyParamsValues.value[index];
      return acc;
    }, {}),
  );

  const response = await fetch(url.toString(), {
    method: props.endpoint.method,
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(
    //   bodyParams.value.reduce((acc, param, index) => {
    //     // @ts-ignore
    //     acc[param.field] = bodyParamsValues.value[index];
    //     return acc;
    //   }, {}),
    // ),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
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
          <div class="grid grid-cols-[1fr_auto_auto]">
            <div class="flex flex-wrap">
              <div class="fetch_input_box">
                <label for="endpoint-url-path" class="fetch_label">url</label>
                <div class="" id="endpoint-url-path">
                  {{ endpoint.url }}
                </div>
              </div>
              <!-- url path params -->
              <div
                v-for="(urlParam, index) in urlParams"
                :key="index"
                class="fetch_input_box"
              >
                <label :for="urlParam.field" class="fetch_label">{{
                  urlParam.field
                }}</label>
                <div>
                  <div>
                    /
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
                      required=false
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="border-1-3 py-2 px-5 fs-10 fw-700 border-rad-5"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>

        <div class="flex">
          <div v-for="(bodyParam, index) in bodyParams" :key="index">
            <label :for="bodyParam.field" class="fetch_label"
              >body {{ bodyParam.field }}</label
            >
            <input
              class="bg-transparent border-1-1 p-2"
              :id="bodyParam.field"
              :type="bodyParam.type"
              v-model="bodyParamsValues[index]"
              :required="bodyParam.validate === 'required'"
            />
          </div>
        </div>
      </div>
    </form>
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
