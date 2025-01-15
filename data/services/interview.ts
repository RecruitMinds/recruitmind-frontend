import { apiClient } from '../api/client'
import { PaginatedResponse, Pagination } from '../types/common'
import { Interview, InterviewList, InterviewStatus } from '../types/interview'

export const interviewService = {
  getAll: async (
    status: InterviewStatus,
    pagination: Pagination,
    search?: string
  ) => {
    const { page, limit } = pagination
    const searchQuery = search ? `&search=${search}` : ''

    return apiClient.fetch<PaginatedResponse<Interview>>(
      `interview?page=${page}&limit=${limit}&status=${status}${searchQuery}`
    )
  },

  getInterviewList: async () => {
    return apiClient.fetch<InterviewList[]>(`interview/list`)
  },

  getById: (id: number) => apiClient.fetch<Interview>(`/interview/${id}`),

  create: (data: Omit<Interview, 'id'>) =>
    apiClient.fetch<Interview>('/interview', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id: number, data: Partial<Interview>) =>
    apiClient.fetch<Interview>(`/interview/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    apiClient.fetch<void>(`/interview/${id}`, {
      method: 'DELETE'
    })
}
