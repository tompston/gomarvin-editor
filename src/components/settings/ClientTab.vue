<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue';
import * as gomarvin from '../../assets/ts/gomarvin';
import * as utils from '../../assets/ts/utils';

let stored_config = utils.getClient();
const config = reactive(stored_config);

const headerKey = ref('');
const headerValue = ref('');

function addHeader() {
  if (headerKey.value && headerValue.value) {
    config.headers[headerKey.value] = headerValue.value;
    headerKey.value = '';
    headerValue.value = '';
  }
}

// function addOrUpdateHeader() {
//   if (headerKey.value && headerValue.value) {
//     config.headers[headerKey.value] = headerValue.value;
//     headerKey.value = '';
//     headerValue.value = '';
//   }
// }

function removeHeader() {
  if (headerKey.value) {
    delete config.headers[headerKey.value];
    headerKey.value = '';
  }
}

function deleteHeader(key: string | number) {
  delete config.headers[key];
}

watchEffect(() => {
  utils.saveConfigToLocalStorage(utils.localStorageClientKey, config);
});
</script>

<template>
  <div>host_url</div>
  <div>{{ config.host_url }}</div>
  <input type="text" v-model="config.host_url" class="client_input" />

  <div>api_prefix</div>
  <div>{{ config.api_prefix }}</div>

  <div>headers</div>
  <div class="code">{{ config.headers }}</div>

  <div>
    <label for="header-key">Header Key:</label>
    <input type="text" id="header-key" v-model="headerKey" />
  </div>
  <div>
    <label for="header-value">Header Value:</label>
    <input type="text" id="header-value" v-model="headerValue" />
  </div>
  <button @click="addHeader">Add Header</button>
  <button @click="removeHeader">Remove Header</button>

  <!-- <div>
    <ul>
      <li v-for="(value, key) in config.headers" :key="key">
        {{ key }}: {{ value }}
        <button
          @click="deleteHeader(key)"
          class="bg-red-600 text-white fw-700 fs-10 py-2 px-4"
        >
          Delete
        </button>
      </li>
    </ul>
  </div> -->

  <div>
    <ul>
      <li v-for="(value, key) in config.headers" :key="key">
        <input type="text" v-model="config.headers[key]" />
        : {{ key }}
        <button
          @click="deleteHeader(key)"
          class="bg-red-600 text-white fw-700 fs-10 py-2 px-4"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<style>
.client_input {
  background-color: transparent;
  border: var(--border-1-3);
}
</style>
