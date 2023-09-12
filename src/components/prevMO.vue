<template>
    <span class="prevmo-contain">
        <span class="icon-size">
            <img src="/src/assets/ArrowLeft.svg" class="premo-img"/>
        </span>
        <button 
            type="button"
            class="prevmo-btn"
            :disabled="internalDisabled"
            :aria-label="t('pagination.prev')"
            :aria-disabled="internalDisabled"
            @click="$emit('click', $event)"
        >
            {{ t('pagination.prevmo') }}
        </button>
    </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { paginationPrevMOEmits, paginationPrevMOProps } from './prevMO'

defineOptions({
    name: 'OPaginationPrevMO',
})

const props = defineProps(paginationPrevMOProps)
defineEmits(paginationPrevMOEmits)

const { t } = useLocale()

const internalDisabled = computed(
    () => props.disabled || props.currentPage <= 1
)

</script>

<style lang="scss" scoped>
.prevmo-contain {
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon-size {
        width: 12px;
        margin-right: 8px;
        .premo-img {
            width: 100%;
            height: 100%;
            color: #7d32ea;
        }
    }
    .prevmo-btn {
        outline: none;
        border: none;
        font-size: 12px;
        color: #000000;
        background-color: transparent;
        line-height: 100%;
        cursor: pointer;
    }
    .prevmo-btn:disabled {
        color: gray;
        cursor: not-allowed;
    }
}
</style>