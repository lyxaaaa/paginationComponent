import type { ExtractPropTypes } from 'vue'
import type Total from './Total.vue'

export const paginationTotalProps = {
    total: {
        type: Number,
        required: true,
    },
} as const

export type PaginationTotalProps = ExtractPropTypes<typeof paginationTotalProps>

export type TotalInstance = InstanceType<typeof Total>