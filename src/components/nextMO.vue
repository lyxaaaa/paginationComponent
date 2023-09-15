<template>
    <span class="oPaginationNextMo">
        <button 
            type="button"
            class="nextMoBtn"
            :disabled="internalDisabled"
            :aria-label="t('pagination.next')"
            :aria-disabled="internalDisabled"
            @click="$emit('click', $event)"
        >
            {{ t('pagination.nextmo') }}
        </button>
        <span :class="['nextMoIconWrapper', {'nextMoIconWrapperDisabled': internalDisabled}]">
            <OPaginationIcon class="nextMoIconSize">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z">
                    </path>
                </svg>
            </OPaginationIcon>
        </span>
    </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { paginationNextMOProps } from './NextMO'
import OPaginationIcon from '../assets/OPaginationIcon.vue'

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
.oPaginationNextMo {
    display: flex;
    flex-direction: row;
    align-items: center;
    .nextMoBtn {
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
    .nextMoBtn:disabled {
        color: #707070;
        cursor: not-allowed;
    }
    .nextMoIconWrapper {
        display: flex;
        align-items: center;
        color: #7d32ea;
        .nextMoIconSize {
            font-size: 12px;
        }
    }
    .nextMoIconWrapperDisabled {
        color: #707070;
    }
}
</style>