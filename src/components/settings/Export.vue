<script setup lang="ts">
import * as utils from "../../assets/ts/utils/utils";
import { ref } from "vue";

defineProps<{ config: any; header: string }>();

const copiedToClipbard = ref(false);

async function saveToClipbard(data: any) {
  navigator.clipboard.writeText(data).then(
    async function () {
      console.log(data);
      copiedToClipbard.value = true;
      const pause = await fakePause(3200);
      copiedToClipbard.value = false;
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

function fakePause(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, time);
  });
}
</script>

<template>
  <div class="tab__header">{{ header }}</div>

  <div class="grid gap-[10px] export--grid">
    <div class="export--buttons-grid">
      <div class="flex mb-[8px]">
        <button class="modal__btn" @click="saveToClipbard(JSON.stringify(config, undefined, 2))">
          Copy to clipbard
        </button>
      </div>
      <div class="flex">
        <button class="modal__btn" @click="utils.saveDataToJsonFile(config)">
          Save to JSON
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 overflow-x-scroll">
      <div class="border-1-2 p-[16px] border-rad-4">
        <pre class="font-mono fs-10">{{ JSON.stringify(config, undefined, 3) }}</pre>
      </div>
    </div>

    <transition name="fade">
      <div v-if="copiedToClipbard" class="copied-to-clipboard-box">
        Config copied to clipboard!
      </div>
    </transition>
  </div>
</template>

<style>
.export--grid {
  grid-template-columns: 144px auto;
}

.copied-to-clipboard-box {
  border-radius: var(--border-rad-5);
  padding: 7px 21px;
  font-weight: 700;
  font-size: var(--fs-9);
  background: #000;
  color: rgb(255, 255, 255);
  position: fixed;
  bottom: 0;
  right: 0;
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
