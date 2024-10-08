import type { Component, ExtractPropTypes, PropType } from 'vue'
import type Next from './Next.vue'

export const definePropType = <T>(val: any): PropType<T> => val

export const iconPropType = definePropType<string | Component>([
    String,
    Object,
    Function,
])


export const paginationNextProps = {
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

export type PaginationNextProps = ExtractPropTypes<typeof paginationNextProps>

export type NextInstance = InstanceType<typeof Next>