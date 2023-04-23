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

// function removeHeader() {
//   if (headerKey.value) {
//     delete config.headers[headerKey.value];
//     headerKey.value = '';
//   }
// }

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
  <!-- <button @click="removeHeader">Remove Header</button> -->

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

  <!-- <div>
    <ul>
      <li v-for="(value, key) in config.headers" :key="key">
        {{ key }} :
        <input
          type="text"
          class="bg-transparent border-1-1 p-1"
          v-model="config.headers[key]"
        />
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
    <div class="fs-7 fw-700 opacity-85">Headers</div>

    <div>
      <div class="headers_table text-[10px] fw-700 py-1.5">
        <div class="opacity-60">KEY</div>
        <div class="opacity-60">VALUE</div>
        <div></div>
      </div>

      <div class="grid gap-2---">
        <div
          v-for="(value, key) in config.headers"
          :key="key"
          class="headers_table border-1-3-bottom"
        >
          <div class="flex items-center justify-left">{{ key }}</div>
          <input
            type="text"
            class="flex items-center justify-left headers_table__input"
            v-model="config.headers[key]"
          />
          <button
            @click="deleteHeader(key)"
            class="bg-red-600 hover:bg-red-700 headers_btn"
          >
            Delete
          </button>
        </div>
        <div class="headers_table">
          <input
            type="text"
            id="header-key"
            v-model="headerKey"
            placeholder="key"
            class=""
          />
          <input
            type="text"
            id="header-value"
            v-model="headerValue"
            placeholder="value"
            class="headers_table__input"
          />
          <button @click="addHeader" class="headers_btn bg-green-500 hover:bg-green-700">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.client_input {
  background-color: transparent;
  border: var(--border-1-3);
}

.headers_table {
  display: grid;
  grid-template-columns: 170px 1fr auto;
  gap: 10px;
  font-size: 12px;
  /* padding-top: 5px; */
  /* padding-bottom: 5px; */
  margin-bottom: 10px;
}

.headers_table__input {
  background: var(--bg-light-select-1);
  border-radius: var(--border-rad-5);
  padding-left: 10px;
}

.headers_btn {
  width: 74px;
  color: white;
  font-weight: 700;
  font-size: 10px;
  padding: 2px 4px;
  font-size: var(--fs-10);
  transition-property: color, background-color, border-color, text-decoration-color, fill,
    stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  padding: 5px 2px;
  border-radius: var(--border-rad-5);
}
</style>
