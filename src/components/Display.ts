import type { ExtractPropTypes } from 'vue'
import type Display from './Display.vue'

export const paginationDisplayProps = {
    disabled: Boolean,
    //当前页码
    currentPage: {
        type: Number,
        default: 1,
    },
    //总页数
    pageCount: {
        type: Number,
    },
} as const

export type PaginationDisplayProps = ExtractPropTypes<
    typeof paginationDisplayProps
>

export type PaginationDisplayInstance = InstanceType<typeof Display>