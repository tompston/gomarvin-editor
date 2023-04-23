<script setup lang="ts">
import * as gomarvin_config from '../../assets/ts/gomarvin/interfaces'


defineProps<{
  endpoint: gomarvin_config.Endpoint
}>()

function convertEnpointToFetchRequest(e: gomarvin_config.Endpoint) {
  const url = e.url

  //   console.log("qwe")
  const url_params = e.url_params
  if (url_params.length != 0) {
  }

  return fetch(e.url, {
    method: e.method,
  })
}
</script>

<template>
  <div class="mt-4 code p-5">
    {{ endpoint }}

    <div>
      <button
        @click="convertEnpointToFetchRequest(endpoint)"
        class="bg-green-700 px-6 py-2 fw-600 border-rad-5"
      >
        qwe
      </button>
    </div>
  </div>
</template>
