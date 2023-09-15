<template>
    <span class="oPaginationDisplayPc" :disabled="disabled">
        {{ currentPage }} / {{ pageCount }}
    </span>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { usePagination } from '../usePagination'
import { paginationDisplayProps } from './Display'

defineOptions({
    name: 'OPaginationDisplay',
})

defineProps(paginationDisplayProps)
const { disabled, currentPage, pageCount } = usePagination()
</script>

<style lang="scss" scoped>
.oPaginationDisplayPc {
    white-space: nowrap;
    font-size: 14px;
    margin: 0 8px;
}
</style>