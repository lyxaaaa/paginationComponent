<template>
    <span class="oPaginationDisMoContain">
        <input 
            ref="userInput"
            type="number"
            class="disMoInput"
            :value="currentPage"
            :min="1"
            :max="pageCount"
            :disabled="disabled"
            :model-value="innerValue"
            :validate-event="false"
            :label="t('pagination.page')"
            @update:model-value="handleInput"
            @keydown.enter="handleJump"
            @blur="handleJump"
        >
        <span class="disMoDivision">/</span>
        <span class="disMoPageCount">{{ pageCount }}</span>
    </span>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { usePagination } from '../usePagination'
import { paginationDisplayMOProps } from './DisplayMO'

defineOptions({
    name: 'OPaginationDisplayMO',
})

defineProps(paginationDisplayMOProps)
const { disabled, currentPage, pageCount, changeEvent } = usePagination()
const { t } = useLocale()
const userInput = ref<number | string>()
let innerValue = computed(() => userInput.value ?? currentPage?.value)

function handleInput(val: number | string) {
    userInput.value = val ? +val : ''
}

//用户按下Enter键 或者 焦点从输入框移开 触发
function handleJump(event: Event) {
    event.preventDefault(); // 阻止默认事件
    event.stopPropagation(); // 阻止事件冒泡
    const inputValue = (event.target as HTMLInputElement).value
    let val = Math.trunc(+inputValue)
    changeEvent?.(val)
    const inputElement = event.target as HTMLInputElement;
    inputElement.blur();
    userInput.value = undefined
}

</script>

<style lang="scss" scoped>
.oPaginationDisMoContain {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 28px;
    text-align: center;
    font-size: 12px;
    cursor: default;
    .disMoInput {
        width: 20px;
        height: 14px;
        outline: none;
        border: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        background-color: transparent;
        color: #7d32ea;
        font-size: 100%;
    }
    .disMoInput:focus {
        border: 1px solid #7d32ea;
    }
    input[type=number] {
        -moz-appearance: textfield;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .disMoDivision {
        margin: 0 4px;
    }
    .disMoPageCount {
        white-space: nowrap;
        font-size: 100%;
    }
}
</style>