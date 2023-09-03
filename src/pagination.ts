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
import ArrowLeft from './assets/icon/ArrowLeft.vue'
import ArrowRight from './assets/icon/ArrowRight.vue'
import { useLocale } from './hooks/useLocale'
import { useNamespace } from './hooks/useNamespace'
import { OPaginationKey } from './constants'
import './test.scss'

import Prev from './components/prev.vue'
import Next from './components/next.vue'
import Sizes from './components/sizes.vue'
import Jumper from './components/jumper.vue'
import Total from './components/total.vue'
import Pager from './components/pager.vue'

import type { ExtractPropTypes, VNode } from 'vue'

const definePropType = <T>(val: any): PropType<T> => val

const iconPropType = definePropType<string | Component>([
    String,
    Object,
    Function,
])

const isAbsent = (v: unknown): v is undefined => typeof v !== 'number'
const isNumber = (val: any): val is number => typeof val === 'number'

type LayoutKey =
    | 'prev'
    | 'pager'
    | 'next'
    | 'jumper'
    | '->'
    | 'total'
    | 'sizes'
    | 'slot'

export const paginationProps = {
    /**
     * @description options of item count per page
     */
    pageSize: Number,
    /**
     * @description default initial value of page size, not setting is the same as setting 10
     */
    defaultPageSize: Number,
    /**
     * @description total item count
     */
    total: Number,
    /**
     * @description 总页数 Set either `total` or `page-count` and pages will be displayed; if you need `page-sizes`, `total` is required
     */
    pageCount: Number,
    /**
     * @description number of pagers. Pagination collapses when the total page count exceeds this value
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
     * @description 当前页
     */
    currentPage: Number,
    /**
     * @description default initial value of current-page, not setting is the same as setting 1
     */
    defaultCurrentPage: Number,
    /**
     * @description layout of Pagination, elements separated with a comma
     */
    layout: {
        type: String,
        default: (
        ['prev', 'pager', 'next', 'jumper', '->', 'total'] as LayoutKey[]
        ).join(', '),
    },
    /**
     * @description 数组 item count of each page
     */
    pageSizes: {
        // type: definePropType<number[]>(Array),
        // default: () => mutable([10, 20, 30, 40, 50, 100] as const),
        type: Array as () => number[],
        default: () => [10, 20, 30, 40, 50, 100] as const,
    },
    /**
     * @description 选择pageSize的下拉框样式
     */
    popperClass: {
        type: String,
        default: '',
    },
    /**
     * @description text for the prev button
     */
    prevText: {
        type: String,
        default: '',
    },
    /**
     * @description icon for the prev button, higher priority of `prev-text`
     */
    prevIcon: {
        type: iconPropType,
        default: () => ArrowLeft,
    },
    /**
     * @description text for the next button
     */
    nextText: {
        type: String,
        default: '',
    },
    /**
     * @description icon for the next button, higher priority of `next-text`
     */
    nextIcon: {
        type: iconPropType,
        default: () => ArrowRight,
    },
    /**
     * @description 是否使用小型分页器
     */
    small: Boolean,
    /**
     * @description 是否buttons有背景颜色
     */
    background: Boolean,
    /**
     * @description 是否分页器被禁用
     */
    disabled: Boolean,
    /**
     * @description 当只有一页时，是否隐藏
     */
    hideOnSinglePage: Boolean,
    } as const
export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const paginationEmits = {
    'update:current-page': (val: number) => isNumber(val),
    'update:page-size': (val: number) => isNumber(val),
    'size-change': (val: number) => isNumber(val),
    'current-change': (val: number) => isNumber(val),
    'prev-click': (val: number) => isNumber(val),
    'next-click': (val: number) => isNumber(val),
}
export type PaginationEmits = typeof paginationEmits


export default defineComponent({
    name: 'OPagination',
    props: paginationProps,
    emits: paginationEmits,
    setup(props, { emit,slots }) {
        const { t } = useLocale()
        const ns = useNamespace('pagination')
        const vnodeProps = getCurrentInstance()!.vnode.props || {}
        // we can find @xxx="xxx" props on `vnodeProps` to check if user bind corresponding events
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
                    // (else block just for explaination)
                    }
                }
            }
            return true
        })

        //传递给 ref 的值会被包装成一个响应式对象，当这个值发生变化时，组件会自动更新。
        const innerPageSize = ref(
            isAbsent(props.defaultPageSize) ? 10 : props.defaultPageSize
        )
        const innerCurrentPage = ref(
            isAbsent(props.defaultCurrentPage) ? 1 : props.defaultCurrentPage
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
            console.log('prev-click')
        }

        function next() {
            if (props.disabled) return
            currentPageBridge.value += 1
            emit('next-click', currentPageBridge.value)
            console.log('next-click')
        }

        function addClass(element: any, cls: string) {
            if (element) {
                if (!element.props) {
                    element.props = {}
                }
                element.props.class = [element.props.class, cls].join(' ')
            }
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
            //传入的布局字符串，描述了分页器应该显示哪些控件
            if (!props.layout) return null
            //判断在只有一页时是否隐藏分页器
            if (props.hideOnSinglePage && pageCountBridge.value <= 1) return null

            const rootChildren: Array<VNode | VNode[] | null> = []
            const rightWrapperChildren: Array<VNode | VNode[] | null> = []

            const rightWrapperRoot = h(
                'div',// 创建一个 <div> 元素
                { class: ns.e('rightwrapper') },// 类名
                rightWrapperChildren  // 设置右侧包装容器的子元素
            )

            //一个映射对象，将布局关键字映射到对应的渲染组件
            const TEMPLATE_MAP: Record<
                Exclude<LayoutKey, '->'>,
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
                popperClass: props.popperClass,
                disabled: props.disabled,
                size: props.small ? 'small' : 'default',
                // onChange: handleSizeChange,
            }),
            slot: slots?.default?.() ?? null,
            total: h(Total, { total: isAbsent(props.total) ? 0 : props.total }),
            }

            const components = props.layout
            .split(',')
            .map((item: string) => item.trim()) as LayoutKey[]

            let haveRightWrapper = false

            //将各个布局关键字对应的渲染组件分别添加到根元素的子元素数组或右侧包装容器的子元素数组中，以实现动态的分页器布局
            components.forEach((c) => {
                if (c === '->') {
                haveRightWrapper = true
                return
                }
                if (!haveRightWrapper) {
                rootChildren.push(TEMPLATE_MAP[c])
                } else {
                rightWrapperChildren.push(TEMPLATE_MAP[c])
                }
            })

            addClass(rootChildren[0], ns.is('first'))
            addClass(rootChildren[rootChildren.length - 1], ns.is('last'))

            if (haveRightWrapper && rightWrapperChildren.length > 0) {
                addClass(rightWrapperChildren[0], ns.is('first'))
                addClass(
                    rightWrapperChildren[rightWrapperChildren.length - 1],
                    ns.is('last')
                )
                rootChildren.push(rightWrapperRoot)
            }

            return h(
                'div',
                {
                    class: [
                        'test',
                        ns.b(),
                        ns.is('background', props.background),
                        {
                        [ns.m('small')]: props.small,
                        },
                    ],
                },
                rootChildren
            )
        }
    }
})