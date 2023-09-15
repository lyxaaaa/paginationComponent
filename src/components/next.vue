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
        <OPaginationIcon class="nextPcArrowIcon" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                <path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z">
                </path>
            </svg>
        </OPaginationIcon>
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { paginationNextProps } from './Next'
import OPaginationIcon from '../assets/OPaginationIcon.vue'

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