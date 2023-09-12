import type { ExtractPropTypes } from 'vue'
import type PrevMO from './prevMO.vue'

export const paginationPrevMOProps = {
    disabled: Boolean,
    currentPage: {
        type: Number,
        default: 1,
    }
} as const

export const paginationPrevMOEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type PaginationPrevMOProps = ExtractPropTypes<typeof paginationPrevMOProps>

export type PrevMOInstance = InstanceType<typeof PrevMO>