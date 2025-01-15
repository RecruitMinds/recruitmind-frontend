import { apiClient } from '../api/client'
import { Candidate } from '../types/candidate'
import { PaginatedResponse, Pagination } from '../types/common'

export const candidateService = {
  getAll: async (
    pagination: Pagination,
    interview?: string,
    search?: string
  ) => {
    const { page, limit } = pagination
    const searchQuery = search ? `&search=${search}` : ''
    const interviewQuery = interview ? `&interview=${interview}` : ''

    return apiClient.fetch<PaginatedResponse<Candidate>>(
      `candidate?page=${page}&limit=${limit}${interviewQuery}${searchQuery}`
    )
  }
}
