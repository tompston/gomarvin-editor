<script setup lang="ts">
import * as gomarvin from '../../assets/ts/gomarvin';
import InputErrBox from '../utils/InputErrBox.vue';
import { reactive, ref, watchEffect } from 'vue';
import * as utils from '../../assets/ts/utils';

let stored_config = utils.getClient();
const config: gomarvin.Client = reactive(stored_config);

const headerKey = ref<string>('');
const headerValue = ref<string>('');

function addHeader() {
  if (headerKey.value && headerValue.value) {
    // @ts-ignore
    config.headers[headerKey.value] = headerValue.value;
    headerKey.value = '';
    headerValue.value = '';
  }
}

function deleteHeader(key: string | number | symbol | symbol) {
  // @ts-ignore
  delete config.headers[key];
}

watchEffect(() => {
  utils.saveConfigToLocalStorage(utils.localStorageClientKey, config);
});
</script>

<template>
  <div class="grid gap-5 grid-cols-2 md:grid-cols-1">
    <div>
      <div class="header__2">URL</div>
      <div class="fs-9 pt-1 pb-3 opacity-60">
        Values in the URL fields cannot end with a slash!
      </div>
      <div class="grid gap-3">
        <div class="h-full relative">
          <div class="h-full">
            <div class="fs-10 fw-700 opacity-60 my-1">HOST</div>
            <input
              type="text"
              class="headers_table__input py-1"
              v-model="config.host_url"
              placeholder="url"
            />
          </div>
        </div>
        <div>
          <div class="fs-10 fw-700 opacity-60 my-1">API PREFIX</div>
          <input
            type="text"
            class="headers_table__input py-1"
            v-model="config.api_prefix"
            placeholder="api prefix"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="header__2">Headers</div>

      <div>
        <div class="headers_table text-[8px] fw-700 !py-0">
          <div class="opacity-60">KEY</div>
          <div class="opacity-60">VALUE</div>
          <div></div>
        </div>

        <div class="grid">
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
              class="bg-transparent"
            />
            <input
              type="text"
              id="header-value"
              v-model="headerValue"
              placeholder="value"
              class="headers_table__input"
            />
            <button
              @click="addHeader"
              class="headers_btn bg-green-500 hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="cod mt-10">
    {{ config }}
  </div> -->
</template>

<style scoped>
.headers_table {
  display: grid;
  grid-template-columns: 170px 1fr auto;
  gap: 10px;
  font-size: 12px;
  padding: 7px 0px;
  /* margin: 3x 0px; */
  margin-top: 5px;

}

.headers_table__input {
  background: var(--bg-light-select-1);
  border-radius: var(--border-rad-5);
  font-size: var(--fs-10);
  padding-left: 10px;
  max-width: 300px;
  width: 100%;
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

.header__2 {
  display: grid;
  font-size: var(--fs-7);
  font-weight: 700;
  opacity: 0.85;
}
</style>
