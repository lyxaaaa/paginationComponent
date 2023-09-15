<template>
    <span class="oPaginationPrevMo">
        <span :class="['prevMoIconWrapper', {'prevMoIconWrapperDisabled': internalDisabled}]">
            <OPaginationIcon class="pevMoIconSize">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z">
                    </path>
                </svg>
            </OPaginationIcon>
        </span>
        <button 
            type="button"
            class="prevMoBtn"
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
import { paginationPrevMOEmits, paginationPrevMOProps } from './PrevMO'
import OPaginationIcon from '../assets/OPaginationIcon.vue'

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
.oPaginationPrevMo {
    display: flex;
    flex-direction: row;
    align-items: center;
    .prevMoIconWrapper {
        display: flex;
        align-items: center;
        color: #7d32ea;
        .pevMoIconSize {
            font-size: 12px;
            margin-right: 8px;
        }
    }
    .prevMoIconWrapperDisabled {
        color: #707070;
    }
    .prevMoBtn {
        outline: none;
        border: none;
        font-size: 12px;
        color: #000000;
        background-color: transparent;
        line-height: 100%;
        white-space: nowrap;
        cursor: pointer;
    }
    .prevMoBtn:disabled {
        color: gray;
        cursor: not-allowed;
    }
}
</style>