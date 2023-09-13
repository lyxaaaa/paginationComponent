<template>
<span class="opagination-total" :disabled="disabled">
    {{
        `${t('pagination.total')}: ${total}`
    }}
</span>
</template>

<script lang="ts" setup>
import { useLocale } from '../hooks/useLocale'
import { usePagination } from '../usePagination'
import { paginationTotalProps } from './total'

const { t } = useLocale()
const { disabled } = usePagination()

defineOptions({
    name: 'OPaginationTotal',
})

const props = defineProps(paginationTotalProps)
const total = props.total
</script>

<style lang="scss" scoped>
.opagination-total {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #999999;
    font-size: 14px;
    font-weight: 300;
    white-space: nowrap;
    margin: 0 6px;
    box-sizing: border-box;
    padding: 0;
}
</style>