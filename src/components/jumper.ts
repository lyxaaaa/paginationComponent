import type { ExtractPropTypes } from 'vue'
import type Jumper from './Jumper.vue'

const componentSizes = ['', 'default', 'small', 'large'] as const

export const paginationJumperProps = {
    size: {
        type: String,
        values: componentSizes,
    },
} as const

export type PaginationJumperProps = ExtractPropTypes<
    typeof paginationJumperProps
>

export type PaginationJumperInstance = InstanceType<typeof Jumper>