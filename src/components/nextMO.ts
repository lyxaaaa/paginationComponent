import type { ExtractPropTypes } from 'vue'
import type NextMO from './NextMO.vue'

export const paginationNextMOProps = {
    disabled: Boolean,
    currentPage: {
        type: Number,
        default: 1,
    },
    pageCount: {
        type: Number,
        default: 50,
    },
} as const

export type PaginationNextMOProps = ExtractPropTypes<typeof paginationNextMOProps>

export type NextMOInstance = InstanceType<typeof NextMO>