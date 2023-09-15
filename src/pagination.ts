import {
    computed,
    defineComponent,
    getCurrentInstance,
    h,
    provide,
    ref,
    watch,
    Component,
    PropType
} from 'vue'
import { OPaginationKey } from './constants'
import './test.scss'

//PC端
import Prev from './components/Prev.vue'
import Next from './components/Next.vue'
import Sizes from './components/Sizes.vue'
import Jumper from './components/Jumper.vue'
import Total from './components/Total.vue'
import Pager from './components/Pager.vue'
import Display from './components/Display.vue'

//移动端
import PrevMO from './components/PrevMO.vue' 
import NextMO from './components/NextMO.vue'
import DisplayMO from './components/DisplayMO.vue'

import type { ExtractPropTypes, VNode } from 'vue'

const definePropType = <T>(val: any): PropType<T> => val

const iconPropType = definePropType<string | Component>([
    String,
    Object,
    Function,
])

const isAbsent = (v: unknown): v is undefined => typeof v !== 'number'
const isNumber = (val: any): val is number => typeof val === 'number'

type LayoutKeyPC =
    | 'prev'
    | 'pager'
    | 'next'
    | 'jumper'
    | 'sizes'
    | 'display'

type LayoutKeyMO =
    | 'prevMO'
    | 'displayMO'
    | 'nextMO'


//PC端
export const paginationPropsPC = {
    /**
     * @description 每页容量
     */
    pageSize: Number,
    /**
     * @description 默认的每页容量，一般为10
     */
    defaultPageSize: Number,
    /**
     * @description 数据总量
     */
    total: Number,
    /**
     * @description 总页数 （`total`和`page-count`二者选其一即可。若需要`page-sizes`，则必须传递`total`）
     */
    pageCount: Number,
    /**
     * @description 展示列表的页码数
     */
    pagerCount: {
        type: Number,
        //用于验证 number类型，整数，在4-22之间，奇数
        validator: (value: unknown) => {
            return (
                isNumber(value) &&
                Math.trunc(value) === value &&
                value > 4 &&
                value < 22 &&
                value % 2 === 1
            )
        },
        default: 7,
    },
    /**
     * @description 当前页码
     */
    currentPage: Number,
    /**
     * @description 默认的当前页码，一般为1
     */
    defaultCurrentPage: Number,
    /**
     * @description 分页器的拆分组件
     */
    layout: {
        type: String,
        default: (
        [ 'sizes', 'prev', 'pager', 'next','display', 'jumper'] as LayoutKeyPC[]
        ).join(', '),
    },
    /**
     * @description 每页容量的可选值（数组）
     */
    pageSizes: {
        type: Array as () => number[],
        default: () => [10, 20, 30, 40, 50, 100] as const,
    },
    /**
     * @description prev按钮的文字值
     */
    prevText: {
        type: String,
        default: '',
    },
    /**
     * @description prev按钮的图标，优先级高于`prevText`
     */
    prevIcon: {
        type: iconPropType,
    },
    /**
     * @description next按钮的文字值
     */
    nextText: {
        type: String,
        default: '',
    },
    /**
     * @description next按钮的图标，优先级高于`nextText`
     */
    nextIcon: {
        type: iconPropType,
    },
    /**
     * @description 是否使用小型分页器
     */
    small: Boolean,
    /**
     * @description 是否分页器被禁用
     */
    disabled: Boolean,
    /**
     * @description 当只有一页时，是否隐藏
     */
    hideOnSinglePage: Boolean,
} as const
export type PaginationPropsPC = ExtractPropTypes<typeof paginationPropsPC>

export const paginationEmitsPC = {
    'update:current-page': (val: number) => isNumber(val),
    'update:page-size': (val: number) => isNumber(val),
    'size-change': (val: number) => isNumber(val),
    'current-change': (val: number) => isNumber(val),
    'prev-click': (val: number) => isNumber(val),
    'next-click': (val: number) => isNumber(val),
}
export type PaginationEmitsPC = typeof paginationEmitsPC

//移动端
export const paginationPropsMO = {
    /**
     * @description 是否分页器被禁用
     */
    disabled: Boolean,
    /**
     * @description 数据总量
     */
        total: Number,
    /**
     * @description 当前页码
     */
    currentPage: {
        type: Number,
        default: 1,
    },
    /**
     * @description 总页数
     */
    pageCount: {
        type: Number,
        // default: 1,
    },
    /**
     * @description 每页容量，默认为10
     */
    pageSize: {
        type: Number,
        default: 10,
    },
    /**
     * @description 当只有一页时，是否隐藏
     */
    hideOnSinglePage: Boolean,
} as const
export type PaginationPropsMO = ExtractPropTypes<typeof paginationPropsMO>

export const paginationEmitsMO = {
    'update:current-page': (val: number) => isNumber(val),
    'current-change': (val: number) => isNumber(val),
    'prev-click': (val: number) => isNumber(val),
    'next-click': (val: number) => isNumber(val),
}
export type PaginationEmitsMO = typeof paginationEmitsMO


export const OPaginationPC =  defineComponent({
    name: 'OPaginationPC',
    props: paginationPropsPC,
    emits: paginationEmitsPC,
    setup(props, { emit,slots }) {
        const vnodeProps = getCurrentInstance()!.vnode.props || {}
        const hasCurrentPageListener =
            'onUpdate:currentPage' in vnodeProps ||
            'onUpdate:current-page' in vnodeProps ||
            'onCurrentChange' in vnodeProps
        const hasPageSizeListener =
            'onUpdate:pageSize' in vnodeProps ||
            'onUpdate:page-size' in vnodeProps ||
            'onSizeChange' in vnodeProps
        //合法性校验
        const assertValidUsage = computed(() => {
            //total 和 pageCount  两者都没有传递
            if (isAbsent(props.total) && isAbsent(props.pageCount)) return false
            //存在currentPage，但是没有对应的监视器
            if (!isAbsent(props.currentPage) && !hasCurrentPageListener) return false
            //当layout包括sizes时判断
            if (props.layout.includes('sizes')) {
                if (!isAbsent(props.pageCount)) {
                    if (!hasPageSizeListener) {
                        //如果 pageCount 属性传递了，但没有相应的事件监听器
                        return false
                    }
                } 
                else if (!isAbsent(props.total)) {
                    if (!isAbsent(props.pageSize)) {
                    if (!hasPageSizeListener) {
                        //total 和 pageSize 都传递了，但是没有对应监视器
                        return false
                    }
                    } else {
                        // for more
                    }
                }
            }
            return true
        })

        const innerPageSize = ref(
            isAbsent(props.defaultPageSize) ? 10 : props.defaultPageSize
        )

        const pageSizeBridge = computed({
            get() {
                return isAbsent(props.pageSize) ? innerPageSize.value : props.pageSize
            },
            set(v: number) {
                if (isAbsent(props.pageSize)) {
                    innerPageSize.value = v
                }
                if (hasPageSizeListener) {
                    emit('update:page-size', v)
                    emit('size-change', v)
                }
            },
        })

        const pageCountBridge = computed<number>(() => {
            let pageCount = 0
            if (!isAbsent(props.pageCount)) {
                pageCount = props.pageCount
            } else if (!isAbsent(props.total)) {
                pageCount = Math.max(1, Math.ceil(props.total / pageSizeBridge.value))
            }
            return pageCount
        })

        const innerCurrentPage = ref(
            isAbsent(props.defaultCurrentPage) ? 1 : props.defaultCurrentPage
        )

        const currentPageBridge = computed<number>({
            get() {
                return isAbsent(props.currentPage)
                ? innerCurrentPage.value
                : (props.currentPage > pageCountBridge.value ? pageCountBridge.value : props.currentPage)
            },
            set(v) {
                let newCurrentPage = v
                if (v < 1) {
                    newCurrentPage = 1
                } else if (v > pageCountBridge.value) {
                    newCurrentPage = pageCountBridge.value
                }
                if (isAbsent(props.currentPage)) {
                    innerCurrentPage.value = newCurrentPage
                }
                if (hasCurrentPageListener) {
                    emit('update:current-page', newCurrentPage)
                    emit('current-change', newCurrentPage)
                }
            },
        })

        watch(pageCountBridge, (val) => {
            if (currentPageBridge.value > val) currentPageBridge.value = val
        })

        function handleCurrentChange(val: number) {
            currentPageBridge.value = val
        }

        function handleSizeChange(val: number) {
            pageSizeBridge.value = val
            const newPageCount = pageCountBridge.value
            if (currentPageBridge.value > newPageCount) {
                currentPageBridge.value = newPageCount
            }
        }

        function prev() {
            if (props.disabled) return
            currentPageBridge.value -= 1
            emit('prev-click', currentPageBridge.value)
        }

        function next() {
            if (props.disabled) return
            currentPageBridge.value += 1
            emit('next-click', currentPageBridge.value)
        }

        provide(OPaginationKey, {
            pageCount: pageCountBridge,
            disabled: computed(() => props.disabled),
            currentPage: currentPageBridge,
            changeEvent: handleCurrentChange,
            handleSizeChange,
        })

        return () => {
            //用于判断组件是否有有效的使用
            if (!assertValidUsage.value) {
                return null
            }
            if (!props.layout) return null
            //判断在只有一页时是否隐藏分页器
            if (props.hideOnSinglePage && pageCountBridge.value <= 1) return null

            const rootChildren: Array<VNode | VNode[] | null> = []
            //一个映射对象，将布局关键字映射到对应的渲染组件
            const TEMPLATE_MAP: Record<
                Exclude<LayoutKeyPC, '->'>,
                VNode | VNode[] | null
            > = {
            prev: h(Prev, {
                disabled: props.disabled,
                currentPage: currentPageBridge.value,
                prevText: props.prevText,
                prevIcon: props.prevIcon,
                onClick: prev,
            }),
            jumper: h(Jumper, {
                size: props.small ? 'small' : 'default',
            }),
            display: h(Display, {
                disabled: props.disabled,
                currentPage: currentPageBridge.value,
                pageCount: pageCountBridge.value,
            }),
            pager: h(Pager, {
                currentPage: currentPageBridge.value,
                pageCount: pageCountBridge.value,
                pagerCount: props.pagerCount,
                onChange: handleCurrentChange,
                disabled: props.disabled,
            }),
            next: h(Next, {
                disabled: props.disabled,
                currentPage: currentPageBridge.value,
                pageCount: pageCountBridge.value,
                nextText: props.nextText,
                nextIcon: props.nextIcon,
                onClick: next,
            }),
            sizes: h(Sizes, {
                pageSize: pageSizeBridge.value,
                pageSizes: props.pageSizes,
                disabled: props.disabled,
                size: props.small ? 'small' : 'default',
                // onChange: handleSizeChange,
            }),
            }

            const components = props.layout
            .split(',')
            .map((item: string) => item.trim()) as LayoutKeyPC[]

            components.forEach((c) => {
                if ( TEMPLATE_MAP[c] ) {
                    rootChildren.push(TEMPLATE_MAP[c] as VNode | VNode[] | null);
                }
            });

            return h(
                'div',
                {
                    class: [
                        'test',
                    ],
                },
                rootChildren
            )
        }
    }
})

export const OPaginationMO = defineComponent({
    name: 'OPaginationMO',
    props: paginationPropsMO,
    emits: paginationEmitsMO,
    setup(props, { emit }) {
        const vnodeProps = getCurrentInstance()!.vnode.props || {}
        const hasCurrentPageListener =
            'onUpdate:currentPage' in vnodeProps ||
            'onUpdate:current-page' in vnodeProps ||
            'onCurrentChange' in vnodeProps

        //合法性校验
        const assertValidUsage = computed(() => {
            //total 和 pageCount  两者都没有传递
            if (isAbsent(props.total) && isAbsent(props.pageCount)) return false
            //存在currentPage，但是没有对应的监视器
            if (!isAbsent(props.currentPage) && !hasCurrentPageListener) return false
            return true
        })

        const innerPageSize = ref(
            isAbsent(props.pageSize) ? 10 : props.pageSize
        )
        const innerCurrentPage = ref(
            isAbsent(props.currentPage) ? 1 : props.currentPage
        )

        const pageSizeBridge = computed({
            get() {
                return isAbsent(props.pageSize) ? innerPageSize.value : props.pageSize
            },
            set(v: number) {
                if (isAbsent(props.pageSize)) {
                    innerPageSize.value = v
                }
            },
        })

        const pageCountBridge = computed<number>(() => {
            let pageCount = 0
            if (!isAbsent(props.pageCount)) {
                pageCount = props.pageCount
            } else if (!isAbsent(props.total)) {
                pageCount = Math.max(1, Math.ceil(props.total / pageSizeBridge.value))
            }
            return pageCount
        })

        const currentPageBridge = computed<number>({
            get() {
                return isAbsent(props.currentPage)
                ? innerCurrentPage.value
                : props.currentPage
            },
            set(v) {
                let newCurrentPage = v
                if (v < 1) {
                    newCurrentPage = 1
                } else if (v > pageCountBridge.value) {
                    newCurrentPage = pageCountBridge.value
                }
                if (isAbsent(props.currentPage)) {
                    innerCurrentPage.value = newCurrentPage
                }
                if (hasCurrentPageListener) {
                    emit('update:current-page', newCurrentPage)
                    emit('current-change', newCurrentPage)
                }
            },
        })

        watch(pageCountBridge, (val) => {
            if (currentPageBridge.value > val) currentPageBridge.value = val
        })

        function handleCurrentChange(val: number) {
            currentPageBridge.value = val
        }

        function handleSizeChange(val: number) {
            pageSizeBridge.value = val
            const newPageCount = pageCountBridge.value
            if (currentPageBridge.value > newPageCount) {
                currentPageBridge.value = newPageCount
            }
        }

        function prev() {
            if (props.disabled) return
            currentPageBridge.value -= 1            
            emit('prev-click', currentPageBridge.value)
        }

        function next() {
            if (props.disabled) return
            currentPageBridge.value += 1
            emit('next-click', currentPageBridge.value)
        }

        provide(OPaginationKey, {
            pageCount: pageCountBridge,
            disabled: computed(() => props.disabled),
            currentPage: currentPageBridge,
            changeEvent: handleCurrentChange,
            // handleSizeChange,
        })

        return () => {
            //用于判断组件是否有有效的使用
            if (!assertValidUsage.value) {
                return null
            }
            //判断在只有一页时是否隐藏分页器
            if (props.hideOnSinglePage && pageCountBridge.value <= 1) return null

            const rootChildren: Array<VNode | VNode[] | null> = []
            const TEMPLATE_MAP: Record<
                Exclude<LayoutKeyMO, '->'>,
                VNode | VNode[] | null
            > = {
                prevMO: h(PrevMO, {
                    disabled: props.disabled,
                    currentPage: currentPageBridge.value,
                    onClick: prev,
                }),
                nextMO: h(NextMO, {
                    disabled: props.disabled,
                    currentPage: currentPageBridge.value,
                    pageCount: pageCountBridge.value,
                    onClick: next,
                }),
                displayMO: h(DisplayMO, {
                    disabled: props.disabled,
                    currentPage: currentPageBridge.value,
                    pageCount: pageCountBridge.value,
                    pageSize: pageSizeBridge.value,
                })
            }

            const components = ['prevMO', 'displayMO', 'nextMO'] as LayoutKeyMO[]

            components.forEach((c) => {
                if ( TEMPLATE_MAP[c] ) {
                    rootChildren.push(TEMPLATE_MAP[c] as VNode | VNode[] | null);
                }
            });

            return h(
                'div',
                {
                    class: [
                        'test',
                    ],
                },
                rootChildren
            )
        }
    }
})