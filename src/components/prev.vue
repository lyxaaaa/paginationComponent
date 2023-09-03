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
    width: 20px;
}
</style>