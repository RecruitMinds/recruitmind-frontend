import { useApiClient } from '../api/client'
import { Candidate } from '../types/candidate'
import { PaginatedResponse, Pagination } from '../types/common'

export function useCandidateService() {
  const api = useApiClient()

  return {
    getAll: async (
      pagination: Pagination,
      interview?: string,
      search?: string
    ) => {
      const { page, limit } = pagination
      const searchQuery = search ? `&search=${search}` : ''
      const interviewQuery = interview ? `&interview=${interview}` : ''

      return api.fetch<PaginatedResponse<Candidate>>(
        `/candidate?page=${page}&limit=${limit}${interviewQuery}${searchQuery}`
      )
    },

    get: async (candidateId: string) => {
      return api.fetch<Candidate>(`/candidate/${candidateId}`)
    },

    delete: async (candidateId: string) => {
      return api.fetch<void>(`/candidate/${candidateId}`, {
        method: 'DELETE'
      })
    }
  }
}
