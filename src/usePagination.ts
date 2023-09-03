import { inject } from 'vue'
// inject注入依赖
import { OPaginationKey } from './constants'

export const usePagination = () => inject(OPaginationKey, {})