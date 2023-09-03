<template>
<span :class="ns.e('total')" :disabled="disabled">
    {{
        `${t('pagination.total')}: ${total}`
    }}
</span>
</template>

<style scoped>
</style>

<script lang="ts" setup>
import { useLocale } from '../hooks/useLocale'
import { useNamespace } from '../hooks/useNamespace'
import { usePagination } from '../usePagination'
import { paginationTotalProps } from './total'

const { t } = useLocale()
const ns = useNamespace('pagination')
const { disabled } = usePagination()

defineOptions({
    name: 'OPaginationTotal',
})

defineProps(paginationTotalProps)
</script>