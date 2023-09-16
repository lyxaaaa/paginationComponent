<template>
    <ul @click="onPagerClick" @keyup.enter="onEnter" class="oPaginationPagerPc">
        <li
            v-if="pageCount > 0"
            :class="['pagerPcNumber',{'pagerPcActivePage' : currentPage === 1 , 'pagerPcDisabled': disabled }]"
            :aria-current="currentPage === 1"
            :aria-label="t('pagination.currentPage', { pager: 1 })"
            :tabindex="tabindex"
        >
            1
        </li>
        <li
            v-if="showPrevMore"
            :class="[...prevMoreKls, { 'pagerPcDisabled': disabled }]"
            :tabindex="tabindex"
            :aria-label="t('pagination.prevPages', { pager: pagerCount - 2 })"
            @mouseenter="onMouseEnter(true)"
            @mouseleave="quickPrevHover = false"
            @focus="onFocus(true)"
            @blur="quickPrevFocus = false"
        >
            <OPaginationIcon v-if="(quickPrevHover || quickPrevFocus) && !disabled">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="14" height="14">
                    <path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path>
                    <rect x="400" y="320" width="64" height="384" fill="none"></rect>
                    <path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z" transform="translate(224 0)"></path>
                </svg>
            </OPaginationIcon>
            <OPaginationIcon v-else>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="14" height="14">
                    <path fill="currentColor" d="M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224z">
                    </path>
                </svg>
            </OPaginationIcon>
        </li>
        <li
            v-for="pager in pagers"
            :key="pager"
            :class="['pagerPcNumber',{'pagerPcActivePage' : currentPage === pager , 'pagerPcDisabled': disabled }]"
            :aria-current="currentPage === pager"
            :aria-label="t('pagination.currentPage', { pager })"
            :tabindex="tabindex"
        >
            {{ pager }}
        </li>
        <li
            v-if="showNextMore"
            :class="[...nextMoreKls, { 'pagerPcDisabled': disabled }]"
            :tabindex="tabindex"
            :aria-label="t('pagination.nextPages', { pager: pagerCount - 2 })"
            @mouseenter="onMouseEnter()"
            @mouseleave="quickNextHover = false"
            @focus="onFocus()"
            @blur="quickNextFocus = false"
        >
            <OPaginationIcon v-if="(quickNextHover || quickNextFocus) && !disabled">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="14" height="14">
                    <path fill="currentColor" d="M414.592 149.376 746.24 489.6a32 32 0 0 0 0 44.672l-331.648 340.352a29.12 29.12 0 0 0-41.728 0 30.592 30.592 0 0 0 0-42.752L684.736 511.936l-311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0 41.728 0z"></path>
                    <rect x="400" y="320" width="64" height="384" fill="none"></rect>
                    <path fill="currentColor" d="M414.592 149.376 746.24 489.6a32 32 0 0 0 0 44.672l-331.648 340.352a29.12 29.12 0 0 0-41.728 0 30.592 30.592 0 0 0 0-42.752L684.736 511.936l-311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0 41.728 0z" transform="translate(224 0)"></path>
                </svg>
            </OPaginationIcon>
            <OPaginationIcon v-else>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="14" height="14">
                    <path fill="currentColor" d="M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224z">
                    </path>
                </svg>
            </OPaginationIcon>
        </li>
        <li
            v-if="pageCount > 1"
            :class="['pagerPcNumber',{'pagerPcActivePage' : currentPage === pageCount , 'pagerPcDisabled': disabled }]"
            :aria-current="currentPage === pageCount"
            :aria-label="t('pagination.currentPage', { pager: pageCount })"
            :tabindex="tabindex"
        >
            {{ pageCount }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { useLocale } from '../hooks/useLocale'
import { paginationPagerProps } from './Pager'
import OPaginationIcon from '../assets/OPaginationIcon.vue'

defineOptions
({
    name: 'OPaginationPager',
})

const props = defineProps(paginationPagerProps)
const disabled = props.disabled
const emit = defineEmits(['change'])
const { t } = useLocale()

const showPrevMore = ref(false)
const showNextMore = ref(false)
const quickPrevHover = ref(false)
const quickNextHover = ref(false)
const quickPrevFocus = ref(false)
const quickNextFocus = ref(false)

const pagers = computed(() => {
    const pagerCount = props.pagerCount
    const halfPagerCount = (pagerCount - 1) / 2
    const currentPage = Number(props.currentPage)
    const pageCount = Number(props.pageCount)
    let showPrevMore = false
    let showNextMore = false
    if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
            showPrevMore = true
        }
        if (currentPage < pageCount - halfPagerCount) {
            showNextMore = true
        }
    }

    const array: number[] = []
    if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
            array.push(i)
        }
    } 
    else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
            array.push(i)
        }
    } 
    else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
            array.push(i)
        }
    } 
    else {
        for (let i = 2; i < pageCount; i++) {
            array.push(i)
        }
    }
    return array
})

const prevMoreKls = computed(() => [
    'pagerMore',
    'quickPrev',
])

const nextMoreKls = computed(() => [
    'pagerMore',
    'quickNext',
])

const tabindex = computed(() => (props.disabled ? -1 : 0))

watchEffect(() => {
    const halfPagerCount = (props.pagerCount - 1) / 2
    showPrevMore.value = false
    showNextMore.value = false
    if (props.pageCount! > props.pagerCount) {
        if (props.currentPage > props.pagerCount - halfPagerCount) {
            showPrevMore.value = true
        }
        if (props.currentPage < props.pageCount! - halfPagerCount) {
            showNextMore.value = true
        }
    }
})

function onMouseEnter(forward = false) {
    //区分是 prev还是next按钮，并设置相应hover值
    if (props.disabled) return
    if (forward) {
        quickPrevHover.value = true
    } else {
        quickNextHover.value = true
    }
}

function onFocus(forward = false) {
    //区分是 prev还是next按钮，并设置相应focus值
    if (forward) {
        quickPrevFocus.value = true
    } else {
        quickNextFocus.value = true
    }
}

function onEnter(e: UIEvent) {
    const target = e.target as HTMLElement
    if (
        target.tagName.toLowerCase() === 'li' &&
        Array.from(target.classList).includes('pagerPcNumber')
    ) {
            const newPage = Number(target.textContent)
            if (newPage !== props.currentPage) {
            emit('change', newPage)
        }
    } else if (
        target.tagName.toLowerCase() === 'li' &&
        Array.from(target.classList).includes('pagerMore')
    ) {
            onPagerClick(e)
    }
}

function onPagerClick(event: UIEvent) {
    const target = event.target as HTMLElement
    //因部分li元素嵌套子元素，使得target不能始终指向li元素，故特使用closest('li')
    const liElement = target.closest('li') as HTMLElement
    if(liElement!==null) {
        if (liElement.tagName.toLowerCase() === 'ul' || props.disabled) {
            return
        }
        let newPage = Number(liElement.textContent)
        const pageCount = props.pageCount!
        const currentPage = props.currentPage
        const pagerCountOffset = props.pagerCount - 2
        if (liElement.className.includes('pagerMore')) {
            if (liElement.className.includes('quickPrev')) {
                newPage = currentPage - pagerCountOffset
            } else if (liElement.className.includes('quickNext')) {
                newPage = currentPage + pagerCountOffset
            }
        }
        //边界测试
        if (!Number.isNaN(+newPage)) {
            if (newPage < 1) {
                newPage = 1
            }
            if (newPage > pageCount) {
                newPage = pageCount
            }
        }
        if (newPage !== currentPage) {
            emit('change', newPage)
        }
    }
}
</script>

<style lang="scss" scoped>
.oPaginationPagerPc {
    user-select: none;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    li {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 36px;
        height: 36px;
        width: 36px;
        font-size: 14px;
        padding: 0 4px;
        margin: 0 4px;
        color: #000000;
        background: #e5e5e5;
        border: none;
        border-radius: 0px;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
            color: #ffffff;
            background-color: #7d32ea;
        }
        .opagination-icon {
            width: 100%;
            height: 100%;
        }
    }
    .pagerPcActivePage {
        color: #ffffff;
        background-color: #7d32ea;
    }
    .pagerPcDisabled {
        color: #000000;
        background-color: #e5e5e5;
        cursor: not-allowed;
        &:hover {
            color: #000000;
            background-color: #e5e5e5;
        }
    }
}
</style>