export interface Pagination {
  page: number
  limit: number
}

export interface PaginationMeta {
  total: number
  page: string
  limit: string
  totalPages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}
