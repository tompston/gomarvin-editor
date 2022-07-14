<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="err_msg_box">
    <div class="err__msg_box_content">
      {{ msg }}
    </div>
  </div>
</template>


<style>
.err_msg_box {
  position: relative;
}

.err__msg_box_content {
  position: static;
  z-index: 12;
  background: rgb(160, 18, 18);
  border: 2px solid rgba(236, 236, 236, 0.2);
  color: white;
  padding: 10px 10px;
  border-radius: 8px;
  box-shadow: var(--shadow-4);
  width: 100%;
  min-width: 180px;
  /* max-width: 220px; */
  transition: all 500ms;
  margin-top: -98px;
  font-size: var(--fs-9);
}
</style>