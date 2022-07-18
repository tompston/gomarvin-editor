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
        <button
          class="export--btn"
          @click="saveToClipbard(JSON.stringify(config, undefined, 2))"
        >
          Copy to clipbard
        </button>
      </div>
      <div class="flex">
        <button class="export--btn" @click="utils.saveDataToJsonFile(config)">
          Save to JSON
        </button>
      </div>
    </div>

    <div class="border-1-2 p-[16px] border-rad-4 opacity-70">
      <pre class="font-mono fs-10">{{ JSON.stringify(config, undefined, 2) }}</pre>
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

.export--btn {
  /* font-family: Helvetica, Arial, 'Lucida Grande', sans-serif; */
  font-weight: 600;
  border-radius: var(--border-rad-5);
  border: var(--border-1-2);
  font-size: var(--fs-9);
  padding: 7px 0px;
  width: 100%;
  color: var(--module-name-btn-txt-col);
}

.export--btn:hover {
  background: #000;
  color: rgb(255, 255, 255);
}

.copied-to-clipboard-box {
  /* border: 2px solid rgba(235, 235, 235, 0.2); */
  border-radius: var(--border-rad-4);
  padding: 11px 24px;
  font-weight: 700;
  font-size: var(--fs-8);
  background: #000;
  color: rgb(255, 255, 255);
  position: fixed;
  bottom: 0;
  right: 0;
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
