<script setup lang="ts">
import * as gomarvin_config from '../../assets/ts/gomarvin/interfaces'
import * as editor from '../../assets/ts/editor/editor'
import * as utils from '../../assets/ts/utils/utils'
import { BodyFieldTypes } from '../../assets/ts/gomarvin/predefined'
import { ref, reactive } from 'vue'
import DeleteSvg from '../utils/svg/DeleteSvg.vue'
import InputErrBox from '../utils/InputErrBox.vue'
import Dropdown1 from '../utils/dropdown/Dropdown1.vue'

defineProps<{ endpoint: any; body_param: any; new_endpoint: boolean; existing_body_params: any }>()
defineEmits(['create_body_field'])

const body_fieldtype_dropdown_is_shown = ref(false)
const custom_body_field_type = ref('')
</script>

<template>
  <div class="endpoint_body_grid">
    <div>
      <input
        type="text"
        placeholder="field_name"
        v-model="body_param.field"
        class="code"
        @input="body_param.field = utils.ConvertToValidValue($event, utils.ValidBodyField)"
      />
      <InputErrBox
        msg="Body field should not be empty!"
        v-if="body_param.field == '' && !new_endpoint"
      />
      <InputErrBox
        msg="Body field already exists!"
        v-if="
          editor.duplicateStringExistsInArray(existing_body_params, body_param.field) &&
          !new_endpoint &&
          body_param.field != '' ||
          editor.stringExistsInArray(existing_body_params, body_param.field) && new_endpoint && body_param.field != ''
        "
      />
    </div>

    <div>
      <div
        class="code dropdown__1_value"
        @click="body_fieldtype_dropdown_is_shown = !body_fieldtype_dropdown_is_shown"
      >{{ body_param.type }}</div>
      <Dropdown1
        :is_shown="body_fieldtype_dropdown_is_shown"
        :options="BodyFieldTypes"
        :value="body_param.type"
        @switch="; (body_param.type = $event), (body_fieldtype_dropdown_is_shown = false)"
      />
    </div>

    <input
      type="text"
      class="code"
      v-model="body_param.validate"
      placeholder="validate field in go struct"
      @input="body_param.validate = utils.ConvertToValidValue($event, utils.ValidValidateField)"
    />

    <!-- if already existing endpoint, return element that allows to delete current body_param -->
    <button
      v-if="!new_endpoint"
      class="flex-center temp-main-col-1 text-col-6 delete_body_param border-rad-5"
      @click="editor.deleteValueFromArray(endpoint.body, body_param)"
    >
      <DeleteSvg dims="14" fill="white" class="qwe" />
    </button>

    <!-- if already existing endpoint, return element that allows to create current body_param -->
    <button
      v-if="new_endpoint"
      class="flex-center"
      :disabled="!editor.canCreateNewBodyField(existing_body_params, body_param.field)"
      @click="$emit('create_body_field')"
    >N</button>
  </div>
</template>



<style>
.endpoint_body_grid {
  display: grid;
  gap: 10px;
  grid-template-columns: 110px 100px 1fr 30px;
  height: 100%;
  width: 100%;
}
.add_new_body_field_type_btn {
  height: 100%;
  width: 100%;
  padding: 5px 0px;
}
</style>