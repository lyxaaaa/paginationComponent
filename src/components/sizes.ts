import type { ExtractPropTypes } from 'vue'
import type Sizes from './Sizes.vue'

export const paginationSizesProps = {
    pageSize: {
        type: Number,
        required: true,
    },
    pageSizes: {
        type: Array as () => number[],
        default: () => [10, 20, 30, 40, 50, 100] as const,
    },
    disabled: Boolean,
} as const

export type PaginationSizesProps = ExtractPropTypes<typeof paginationSizesProps>

export type SizesInstance = InstanceType<typeof Sizes>