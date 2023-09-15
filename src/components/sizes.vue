<template>
    <span class="opaginationSizesPc">
        <div class="sizesPcWrapper" @click="toggleDropdown" ref="selectBox">
            <input 
                type="text"
                :validate-event="false"
                :placeholder="t('pagination.choose')"
                :value="`${innerPageSize} ${t('pagination.pagesize')}`"
                :disabled="disabled"
                readonly
                class="sizesPcInput"
            >
            <span class="sizesPcDownIcon">
                <i :class="['sizesPcIconSize', {'sizesPcIsReverse': isDropdownOpen}]">
                    <img src="/src/assets/ArrowDown.svg" alt="" class="sizesPcArrowTransition"/>
                </i>
            </span>
        </div>
        <transition name="sizesPcDropDown">
            <ul v-show="isDropdownOpen" class="sizesPcOptions">
                <li
                    v-for="item in innerPageSizes"
                    :key="item"
                    :class="['sizesPcOptionStyle', { 'sizesPcSelectedOption': item === innerPageSize }]"
                    @click="handleSelectSize(item)"
                >
                    {{ `${item} ${t('pagination.pagesize')}` }}
                </li>
            </ul>
        </transition>
    </span>
</template>

<script lang="ts" setup>
import { useLocale } from '../hooks/useLocale'
import { computed, onMounted, ref, watch } from 'vue'
import { usePagination } from '../usePagination'
import { paginationSizesProps } from './sizes'

defineOptions({
    name: 'OPaginationSizes',
})

const props = defineProps(paginationSizesProps)
const emit = defineEmits(['page-size-change'])
const disabled = props.disabled
const { t } = useLocale()
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

const selectBox = ref<HTMLElement | null>(null);
onMounted(() => {
    document.addEventListener("click", (e) => {
    if (selectBox.value && !selectBox.value.contains(e.target as Node)) {
        isDropdownOpen.value = false;
    }
    });
});

const innerPageSizes = computed(() => props.pageSizes)
let isDropdownOpen = ref(false)

function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
}

function handleSelectSize(val: number) {
    if(props.disabled) return
    if (!isNaN(val) && val !== innerPageSize.value) {
        innerPageSize.value = val
        pagination.handleSizeChange?.(Number(val))
    }
    isDropdownOpen.value = false
}

function handleChange(event: Event) {
    let val: number = parseInt((event.target as HTMLInputElement).value, 10) // 将字符串转换为整数
    if (!isNaN(val) && val !== innerPageSize.value) {
        innerPageSize.value = val
        pagination.handleSizeChange?.(Number(val))
    }
}
</script>

<style lang="scss" scoped>
.opaginationSizesPc {
    height: 36px;
    margin-right: 8px;
    box-sizing: border-box;
    padding: 1px 11px;
    cursor: pointer;
    .sizesPcWrapper {
        width: 128px;
        height: 36px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #e5e5e5;
        margin-bottom: 6px;
        .sizesPcInput {
            cursor: pointer;
            width: 84px;
            height: 30px;
            appearance: none;
            -webkit-appearance: none;
            color: #000000;
            font-size: 14px;
            padding: 0;
            outline: none;
            border: none;
            background: none;
            box-sizing: border-box;
        }
        .sizesPcDownIcon {
            display: inline-flex;
            white-space: nowrap;
            flex-shrink: 0;
            flex-wrap: nowrap;
            height: 100%;
            text-align: center;
            color: #a8abb2;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: inherit;
            .sizesPcIconSize {
                width: 14px;
                transition: all 0.3s ease;
            }
            .sizesPcIsReverse {
                transform: rotateZ(-180deg);
            }
        }
    }
    .sizesPcOptions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        list-style: none;
        position: absolute;
        padding: 6px 0;
        box-sizing: border-box;
        margin: 6px 0 !important;
        width: 128px;
        z-index: 2;
        background-color: #ffffff;
        .sizesPcOptionStyle {
            display: inline-flex;
            align-items: center;
            width: 100%;
            height: 34px;
            padding: 0 32px 0 20px;
            box-sizing: border-box;
            font-size: 14px;
            color: #000000;
            &:hover {
                background-color: #f5f6f8;
                color: #7d6aed;
            }
        }
        .sizesPcSelectedOption {
            color: #7d6aed;
            background-color: #f5f6f8;
        }
    }
    
    .sizesPcDropDown-enter-active,
    .sizesPcDropDown-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out; 
    }
    .sizesPcDropDown-enter-from {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top; 
    }
    .sizesPcDropDown-enter-to {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: top; 
    }
    .sizesPcDropDown-leave-to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top; 
    }
}
</style>