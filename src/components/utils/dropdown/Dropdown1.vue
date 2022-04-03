<script setup lang="ts">
defineProps<{ is_shown: boolean; options: any; value: any }>()
defineEmits(['switch'])
</script>

<template>
  <transition name="fade--removed">
    <div v-if="is_shown">
      <div class="dropdown__1_content">
        <div class="dropdown__1_options">
          <div v-for="option in options" v-bind:key="option">
            <div
              @click="$emit('switch', option)"
              class="method__option_btn disable-text-select"
              :class="value == option ? 'method__option_btn--selected' : ''"
            >{{ option }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
/* -------- Dropdown 1  */
.dropdown__1 {
  position: relative;
  display: inline-block;
  width: 100%;
}
.dropdown__1_value {
  width: 100%;
  height: 100%;
}
.dropdown__1_content {
  background: rgb(255, 255, 255);
  border: var(--border-1-2);
  /* box-shadow: var(--shadow-4); */
  display: block;
  position: absolute;
  z-index: 1;
  /* max-width: 100px; */
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
  gap: 2px;
}
.dropdown__1_option {
  width: 100%;
  height: 100%;
}
.method__option_btn {
  border: 1px solid rgba(255, 255, 255, 0.705);
  border-radius: var(--border-rad-5);
  padding: 4px 4px;
  gap: 10px;
  font-weight: 500;
  font-size: var(--fs-9);
  transition: var(--transition-1);
}
.method__option_btn:hover {
  border: 1px solid rgba(107, 107, 107, 0.4);
}

.method__option_btn--selected {
  background: var(--selected-bg-col-2);
}
</style>