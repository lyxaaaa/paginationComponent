import type { ComputedRef, InjectionKey, WritableComputedRef } from 'vue'

export interface OPaginationContext {
    //当前页码，可写的计算属性
    currentPage?: WritableComputedRef<number>
    //总页码数，计算属性
    pageCount?: ComputedRef<number>
    //分页器是否被禁用
    disabled?: ComputedRef<boolean>
    //处理页码变化事件
    changeEvent?: (val: number) => void
    //处理每页显示条数pageSize的变化
    handleSizeChange?: (val: number) => void
}

//允许组件在需要时获取和共享分页逻辑的上下文信息

export const OPaginationKey: InjectionKey<OPaginationContext> =
    Symbol('OPaginationKey')