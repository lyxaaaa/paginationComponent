<template>
<span class="oPaginationJump">
    <span class="jumpPcGoto">{{ t('pagination.goto') }}</span>
    <div class="jumpPcInputBox">
        <div class="jumpPcWrapInput">
            <input
                ref="userInput"
                class="jumpPcInnerInput"
                :value="currentPage"
                :min="1"
                :max="pageCount"
                :disabled="disabled"
                :model-value="innerValue"
                :validate-event="false"
                :label="t('pagination.page')"
                type="number"
                @update:model-value="handleInput"
                @change="handleChange"
            />
        </div>
    </div>
    <span class="jumpPcCurrentPage">{{
        t('pagination.pageClassifier')
    }}</span>
</span>
</template>
    
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { usePagination } from '../usePagination'
import { paginationJumperProps } from './Jumper'

defineOptions({
    name: 'OPaginationJumper',
})

defineProps(paginationJumperProps)
const { t } = useLocale()
const { pageCount, disabled, currentPage, changeEvent } = usePagination()
const userInput = ref<number | string>()
let innerValue = computed(() => userInput.value ?? currentPage?.value)

function handleInput(val: number | string) {
    userInput.value = val ? +val : ''
}

function handleChange(event: Event) {
    let inputValue = (event.target as HTMLInputElement).value
    const val = Math.trunc(+inputValue)
    changeEvent?.(val)
    const inputElement = event.target as HTMLInputElement;
    inputElement.blur();
    userInput.value = undefined
}
</script>

<style lang="scss" scoped>
.oPaginationJump {
    display: flex;
    align-items: center;
    height: 36px;
    font-size: 14px;
    font-weight: 300;
    line-height: 22px;
    border-radius: 0;
    margin-left: 16px;
    color: #999999;
    .jumpPcGoto {
        margin-right: 8px;
        white-space: nowrap;
    }
    .jumpPcInputBox {
        display: inline-flex;
        justify-content: center !important;
        text-align: center;
        box-sizing: border-box;
        vertical-align: middle;
        width: 56px;
        position: relative;
        font-size: 14px;
        line-height: 32px;
        .jumpPcWrapInput {
            width: 70%;
            display: inline-flex;
            flex-grow: 0.273;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 1px 11px;
            background-color: #e5e5e5;
            background-image: none;
            transition: box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform: translate3d(0, 0, 0);
            border-radius: 0px;
            box-shadow: none;
            height: 36px;
            .jumpPcInnerInput {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                width: 100%;
                color: #000000;
                font-size: inherit;
                height: 30px;
                line-height: 30px;
                padding: 0;
                outline: none;
                border: none;
                background: none;
                box-sizing: border-box;
            }
            .jumpPcInnerInput:disabled {
                color: #707070;
                cursor: not-allowed;
            }
            input[type=number] {
                -moz-appearance: textfield;
            }
            input[type=number]::-webkit-inner-spin-button,
            input[type=number]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
    }
    .jumpPcCurrentPage {
        margin-left: 8px;
    }
}
</style>