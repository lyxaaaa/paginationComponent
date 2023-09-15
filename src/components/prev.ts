import type { Component, ExtractPropTypes, PropType } from 'vue'
import type Prev from './Prev.vue'

export const definePropType = <T>(val: any): PropType<T> => val

export const iconPropType = definePropType<string | Component>([
    String,
    Object,
    Function,
])

export const paginationPrevProps = {
    disabled: Boolean,
    currentPage: {
        type: Number,
        default: 1,
    },
    prevText: {
        type: String,
    },
    prevIcon: {
        type: iconPropType,
    },
} as const

export const paginationPrevEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type PaginationPrevProps = ExtractPropTypes<typeof paginationPrevProps>

export type PrevInstance = InstanceType<typeof Prev>