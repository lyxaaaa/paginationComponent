import type { ExtractPropTypes } from 'vue'
import type Pager from './Pager.vue'

export const paginationPagerProps = {
    currentPage: {
        type: Number,
        default: 1,
    },
    pageCount: {
        type: Number,
        required: true,
    },
    pagerCount: {
        type: Number,
        default: 7,
    },
    disabled: Boolean,
} as const

export type PaginationPagerProps = ExtractPropTypes<typeof paginationPagerProps>

export type PagerInstance = InstanceType<typeof Pager>