<script setup lang="ts">
import * as gomarvin_config from "../../assets/ts/gomarvin/interfaces";
import * as editor from "../../assets/ts/editor/editor";
import * as utils from "../../assets/ts/utils/utils";
import { BodyFieldTypes } from "../../assets/ts/gomarvin/predefined";
import { ref, reactive } from "vue";
import DeleteSvg from "../utils/svg/DeleteSvg.vue";
import InputErrBox from "../utils/InputErrBox.vue";
import Dropdown1 from "../utils/dropdown/Dropdown1.vue";

defineProps<{
  endpoint: any;
  body_param: any;
  new_endpoint: boolean;
  existing_body_params: any;
}>();
defineEmits(["create_body_field"]);

const body_fieldtype_dropdown_is_shown = ref(false);
const custom_body_field_type = ref("");
</script>

<template>
  <div class="endpoint_body_grid">
    <div>
      <input
        type="text"
        placeholder="field_name"
        v-model="body_param.field"
        class="code w-full"
        @input="
          body_param.field = utils.ConvertToValidValue($event, utils.ValidBodyField)
        "
      />
      <InputErrBox
        msg="Body field can't be empty!"
        v-if="body_param.field == '' && !new_endpoint"
      />
      <InputErrBox
        msg="Body field already exists!"
        v-if="
          (editor.duplicateStringExistsInArray(existing_body_params, body_param.field) &&
            !new_endpoint &&
            body_param.field != '') ||
          (editor.stringExistsInArray(existing_body_params, body_param.field) &&
            new_endpoint &&
            body_param.field != '')
        "
      />
    </div>

    <div>
      <div
        class="code dropdown__1_value"
        @click="body_fieldtype_dropdown_is_shown = !body_fieldtype_dropdown_is_shown"
      >
        {{ body_param.type }}
      </div>
      <Dropdown1
        :is_shown="body_fieldtype_dropdown_is_shown"
        :options="BodyFieldTypes"
        :value="body_param.type"
        @switch="(body_param.type = $event), (body_fieldtype_dropdown_is_shown = false)"
      />
    </div>

    <input
      type="text"
      class="code"
      v-model="body_param.validate"
      placeholder="validate field in go struct"
      autocorrect="off"
      @input="
        body_param.validate = utils.ConvertToValidValue($event, utils.ValidValidateField)
      "
    />

    <!-- if an existing endpoint, return element that allows to delete current body_param -->
    <button
      v-if="!new_endpoint"
      class="flex-center text-col-6 delete_body_param border-rad-5"
      @click="editor.deleteValueFromArray(endpoint.body, body_param)"
    >
      <DeleteSvg dims="14" fill="var(--svg-fill)" class="delete__svg" />
    </button>

    <!-- if a new endpoint, return element that allows to create current body_param -->
    <button
      v-if="new_endpoint"
      class="flex-center create__endpoint_btn"
      :disabled="!editor.canCreateNewBodyField(existing_body_params, body_param.field)"
      @click="$emit('create_body_field')"
    >
      N
    </button>
  </div>
</template>

<style>
.create__endpoint_btn {
  color: var(--selected-text-col-1);
  background: var(--selected-bg-col-1);
  border-radius: 5px;
}
.create__endpoint_btn:disabled {
  opacity: 0.4;
}

.delete_body_param {
  transition: var(--transition-1);
}

.delete_body_param:hover {
  background: var(--main-col-danger);
}
.delete_body_param:hover .delete__svg {
  stroke: #ffffff !important;
}
</style>
