import type { ExtractPropTypes } from 'vue'
import type DisplayMO from './DisplayMO.vue'

export const paginationDisplayMOProps = {
    disabled: Boolean,
    //每页容量
    pageSize: {
        type: Number,
        required: true,
        default: 10,
    },
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

export type PaginationDisplayMOProps = ExtractPropTypes<
    typeof paginationDisplayMOProps
>

export type PaginationDisplayMOInstance = InstanceType<typeof DisplayMO>