<script setup lang="ts">
import InputErrBox from '../utils/InputErrBox.vue';
import { UrlFieldTypes } from '../../assets/ts/gomarvin/predefined'
import * as editor from '../../assets/ts/editor/editor'
import * as utils from '../../assets/ts/utils/utils'
import DeleteSvg from '../utils/svg/DeleteSvg.vue';
import { ref } from 'vue'
defineProps<{ url_param: any; new_endpoint: boolean; endpoint: any }>()

const dropdownIsShown = ref(false)

</script>

<template>
    <div class="url_param_input_grid">
        <input
            type="text"
            class="mevi"
            placeholder="url_param"
            v-model="url_param.field"
            @input="url_param.field = utils.ConvertToValidValue($event, utils.ValidUrlParam)"
        />
        <button
            class="text-col-6 fs-10 fw-600 url_param_input_grid--overlay"
            @click="dropdownIsShown = !dropdownIsShown"
        >{{ url_param.type.slice(0, 3) }}</button>

        <InputErrBox v-if="url_param.field == ''" msg="Url param can't be empty!" />
        <InputErrBox
            msg="url_param already exists!"
            v-if="
                editor.duplicateStringExistsInArray(
                    editor.existing_url_params(endpoint.url_params),
                    url_param.field,
                ) && !new_endpoint
            "
        />
    </div>

    <!-- Dropdown1 with additional delete btn -->
    <transition name="fade--removed">
        <div v-if="dropdownIsShown">
            <div class="dropdown__1_content">
                <div class="dropdown__1_options">
                    <div v-for="option in UrlFieldTypes" v-bind:key="option">
                        <div
                            @click="url_param.type = option; dropdownIsShown = false"
                            class="method__option_btn disable-text-select fs-8"
                            :class="url_param.type == option ? 'method__option_btn--selected' : ''"
                        >{{ option }}</div>
                    </div>
                    <div class="method__option_btn">
                        <button
                            @click="editor.deleteValueFromArray(endpoint.url_params, url_param)"
                        >
                            <DeleteSvg dims="15" fill="black" class="qwe" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
