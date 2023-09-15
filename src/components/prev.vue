<template>
<button
    type="button"
    class="oPaginationPrevPc"
    :disabled="internalDisabled"
    :aria-label="prevText || t('pagination.prev')"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
>
    <span v-if="prevText">{{ prevText }}</span>
    <OPaginationIcon class="prevPcArrowIcon" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z">
            </path>
        </svg>
    </OPaginationIcon>
</button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { paginationPrevEmits, paginationPrevProps } from './Prev'
import OPaginationIcon from '../assets/OPaginationIcon.vue'

defineOptions({
    name: 'OPaginationPrev',
})

const props = defineProps(paginationPrevProps)
defineEmits(paginationPrevEmits)

const { t } = useLocale()

const internalDisabled = computed(
    () => props.disabled || props.currentPage <= 1
)
</script>

<style scoped> 
.prevPcArrowIcon {
    display: block;
    font-size: 12px;
    font-weight: bold;
}
.oPaginationPrevPc {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    outline: none;
    border: none;
    margin-left: 16px;
    background-color: #e5e5e5;
    color: #000000;
    border-radius: 0px;
    font-size: 14px;
    min-width: 32px;
    padding: 0 4px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 4px;
}
.oPaginationPrevPc:disabled {
    cursor: not-allowed;
    background-color: #e5e5e5;
    color: #a8abb2;
}
</style>