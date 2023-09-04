import { inject } from 'vue'
import { OPaginationKey } from './constants'

export const usePagination = () => inject(OPaginationKey, {})