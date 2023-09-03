<template>
<button
    type="button"
    class="btn-prev"
    :disabled="internalDisabled"
    :aria-label="prevText || t('pagination.prev')"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
>
    <span v-if="prevText">{{ prevText }}</span>
    <i class="o-arrowicon" v-else>
        <img src="/src/assets/ArrowLeft.svg" />
    </i>
</button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { paginationPrevEmits, paginationPrevProps } from './prev'

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
.o-arrowicon {
    display: block;
    font-size: 12px;
    font-weight: bold;
    width: 12px;
}
.btn-prev {
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
</style>