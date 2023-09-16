import type { ExtractPropTypes } from 'vue'
import type Jumper from './Jumper.vue'

export const paginationJumperProps = {
    disabled: Boolean,
} as const

export type PaginationJumperProps = ExtractPropTypes<
    typeof paginationJumperProps
>

export type PaginationJumperInstance = InstanceType<typeof Jumper>