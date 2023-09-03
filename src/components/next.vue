<template>
    <button
        type="button"
        class="btn-next"
        :disabled="internalDisabled"
        :aria-label="nextText || t('pagination.next')"
        :aria-disabled="internalDisabled"
        @click="$emit('click', $event)"
    >
        <span v-if="nextText">{{ nextText }}</span>
        <i class="o-arrowicon" v-else>
            <img src="/src/assets/ArrowRight.svg" />
        </i>
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { paginationNextProps } from './next'
import ArrowRight from '../assets/icon/ArrowRight.vue'

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
.o-arrowicon {
    display: block;
    font-size: 12px;
    font-weight: bold;
    width: 20px;
}
</style>