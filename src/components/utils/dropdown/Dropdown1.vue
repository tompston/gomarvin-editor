<script setup lang="ts">
defineProps<{ is_shown: boolean; options: any; value: any }>();
defineEmits(['switch']);
</script>

<template>
  <transition name="fade--removed">
    <div v-if="is_shown">
      <div class="dropdown__1_content shadow-6">
        <div class="dropdown__1_options">
          <div v-for="option in options" v-bind:key="option">
            <!-- Emit and show numbers with 2 decimal places -->
            <div v-if="typeof option === 'number'">
              <div
                @click="$emit('switch', option.toFixed(2))"
                class="method__option_btn disable-text-select"
                :class="value == option ? 'method__option_btn--selected' : ''"
              >
                {{ option.toFixed(2) }}
              </div>
            </div>

            <!-- If the passed down value is a string, emit it -->
            <div v-if="typeof option === 'string'">
              <div
                @click="$emit('switch', option)"
                class="method__option_btn disable-text-select"
                :class="value == option ? 'method__option_btn--selected' : ''"
              >
                {{ option }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.dropdown__1_value {
  width: 100%;
  height: 100%;
}

.dropdown__1_content {
  z-index: 20;
  background-color: var(--main-bg-col);
  border: var(--border-1-2);
  /* box-shadow: var(--shadow-5); */
  display: block;
  position: absolute;
  z-index: 1;
  min-width: 103px;
  max-height: 180px;
  overflow-y: auto;
  margin-top: 7px;
  border-radius: 8px;
}

.dropdown__1_content {
  padding: 10px 10px;
}

.dropdown__1_options {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  /* gap: 4px; */
}

.method__option_btn {
  /* border: var(--border-1-3); */
  border-radius: var(--border-rad-5);
  padding: 5px 4px;
  font-weight: 500;
  font-size: var(--fs-9);
  transition: var(--transition-1);
  cursor: pointer;
}

.method__option_btn:hover {
  background: var(--bg-light-select-2);
}

.method__option_btn--selected {
  background: var(--selected-bg-col-2);
}
</style>
