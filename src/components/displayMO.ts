import type { ExtractPropTypes } from 'vue'
import type DisplayMO from './displayMO.vue'

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
        default: 50,
    },
} as const

export type PaginationDisplayMOProps = ExtractPropTypes<
    typeof paginationDisplayMOProps
>

export type PaginationDisplayMOInstance = InstanceType<typeof DisplayMO>