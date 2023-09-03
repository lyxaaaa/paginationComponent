<template>
    <span :class="ns.e('sizes')">
        <select
            :model-value="innerPageSize"
            :disabled="disabled"
            :popper-class="popperClass"
            :size="size"
            :validate-event="false" 
            @change="handleChange"
        >
        <option
            v-for="item in innerPageSizes"
            :key="item"
            :value="item"
            :label="item + t('pagination.pagesize')"
        />
        </select>
    </span>
</template>

<script lang="ts" setup>
import { useLocale } from '../hooks/useLocale'
import { useNamespace } from '../hooks/useNamespace'
import { computed, ref, watch } from 'vue'
import { usePagination } from '../usePagination'
import { paginationSizesProps } from './sizes'

defineOptions({
name: 'OPaginationSizes',
})

const props = defineProps(paginationSizesProps)
const emit = defineEmits(['page-size-change'])
const { t } = useLocale()
const ns = useNamespace('pagination')
const pagination = usePagination()
const innerPageSize = ref<number>(props.pageSize!)

watch(
    () => props.pageSizes,
    (newVal, oldVal) => {
        if (newVal === oldVal) return
        if (Array.isArray(newVal)) {
        const pageSize = newVal.includes(props.pageSize!)
            ? props.pageSize
            : props.pageSizes[0]
        emit('page-size-change', pageSize)
        }
    }
)

watch(
    () => props.pageSize,
    (newVal) => {
        innerPageSize.value = newVal!
    }
)

const innerPageSizes = computed(() => props.pageSizes)

function handleChange(event: Event) {
    let val: number = parseInt((event.target as HTMLInputElement).value, 10) // 将字符串转换为整数
    console.log('handleChange',val)
    if (!isNaN(val) && val !== innerPageSize.value) {
        innerPageSize.value = val
        pagination.handleSizeChange?.(Number(val))
    }
}
</script>