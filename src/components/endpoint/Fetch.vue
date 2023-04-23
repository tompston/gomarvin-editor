<script setup lang="ts">
import { ref } from 'vue';
import * as gomarvin_config from '../../assets/ts/gomarvin/interfaces';

const props = defineProps<{
  endpoint: gomarvin_config.Endpoint;
}>();

function convertEnpointToFetchRequest(e: gomarvin_config.Endpoint) {
  const url = e.url;

  const url_params = e.url_params;
  if (url_params.length != 0) {
  }

  return fetch(e.url, {
    method: e.method,
  });
}

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
  <div class="mt-4 code p-5">
    {{ endpoint }}

    <!-- <div>
      <button
        @click="convertEnpointToFetchRequest(endpoint)"
        class="bg-green-700 px-6 py-2 fw-600 border-rad-5 fs-10"
      >
        FETCH
      </button>
    </div> -->

    <div class="mt-4"></div>

    <!-- <div v-for="url_param in endpoint.url_params" class="flex">
      <div class="bg-green-800 py-2 px-7">{{ url_param.field }}</div>
    </div> -->

    <form @submit.prevent="handleSubmit">
      <div v-for="(urlParam, index) in urlParams" :key="index">
        <label :for="urlParam.field"
          >url_param {{ urlParam.field }} ({{ urlParam.type }})</label
        >
        <input
          class="bg-transparent border-1-1 p-2"
          :id="urlParam.field"
          :type="urlParam.type"
          v-model="urlParamsValues[index]"
        />
      </div>

      <div v-for="(bodyParam, index) in bodyParams" :key="index">
        <label :for="bodyParam.field"
          >body {{ bodyParam.field }} ({{ bodyParam.type }})</label
        >
        <input
          class="bg-transparent border-1-1 p-2"
          :id="bodyParam.field"
          :type="bodyParam.type"
          v-model="bodyParamsValues[index]"
          :required="bodyParam.validate === 'required'"
        />
      </div>

      <button type="submit" class="bg-green-800 py-2 px-5">Submit</button>
    </form>
  </div>
</template>
