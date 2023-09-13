<template>
    <span class="nextmo-contain">
        <button 
            type="button"
            class="nextmo-btn"
            :disabled="internalDisabled"
            :aria-label="t('pagination.next')"
            :aria-disabled="internalDisabled"
            @click="$emit('click', $event)"
        >
            {{ t('pagination.nextmo') }}
        </button>
        <span class="iconNext-size">
            <img src="/src/assets/ArrowRight.svg" class="nextmo-img"/>
        </span>
    </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { paginationNextMOProps } from './nextMO'

defineOptions({
    name: 'OPaginationNextMO',
})

const props = defineProps(paginationNextMOProps)

defineEmits(['click'])

const { t } = useLocale()

const internalDisabled = computed(
    () =>
        props.disabled ||
        props.currentPage === props.pageCount ||
        props.pageCount === 0
)
</script>

<style lang="scss" scoped>
.nextmo-contain {
    display: flex;
    flex-direction: row;
    align-items: center;
    .nextmo-btn {
        outline: none;
        border: none;
        font-size: 12px;
        margin-right: 8px;
        color: #000000;
        background-color: transparent;
        line-height: 100%;
        white-space: nowrap;
        cursor: pointer;
    }
    .nextmo-btn:disabled {
        color: gray;
        cursor: not-allowed;
    }
    .iconNext-size {
        width: 12px;
        .nextmo-img {
            width: 100%;
            height: 100%;
            color: #7d32ea;
        }
    }
}
</style>