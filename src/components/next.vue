<template>
    <button
        type="button"
        class="oPaginationBtnNext"
        :disabled="internalDisabled"
        :aria-label="nextText || t('pagination.next')"
        :aria-disabled="internalDisabled"
        @click="$emit('click', $event)"
    >
        <span v-if="nextText">{{ nextText }}</span>
        <i class="nextPcArrowIcon" v-else>
            <img src="/src/assets/ArrowRight.svg" alt=""/>
        </i>
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { paginationNextProps } from './next'

defineOptions({
    name: 'OPaginationNext',
})

const props = defineProps(paginationNextProps)

defineEmits(['click'])

const { t } = useLocale()

const internalDisabled = computed(
    () =>
        props.disabled ||
        props.currentPage === props.pageCount ||
        props.pageCount === 0
)
</script>

<style scoped> 
.nextPcArrowIcon {
    display: block;
    font-size: 12px;
    font-weight: bold;
    width: 12px;
}
.oPaginationBtnNext {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    outline: none;
    border: none;
    margin-right: 16px;
    background-color: #e5e5e5;
    color: #000000;
    border-radius: 0px;
    font-size: 14px;
    min-width: 32px;
    padding: 0 4px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    margin-left: 4px;
}
.oPaginationBtnNext:disabled {
    cursor: not-allowed;
    background-color: #e5e5e5;
    color: #a8abb2;
}
</style>