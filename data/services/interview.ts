import { useApiClient } from '../api/client'
import { CandidateList } from '../types/candidate'
import { PaginatedResponse, Pagination } from '../types/common'
import {
  Interview,
  InterviewList,
  CreateInterview,
  InviteCandidate,
  InterviewProgress,
  CandidateInterviewDetail,
  UpdateCandidateInterview
} from '../types/interview'
import {
  InterviewStatus,
  HiringStage,
  CandidateInterviewStatus
} from '../types/enums'

export function useInterviewService() {
  const api = useApiClient()

  return {
    getAll: async (
      status: InterviewStatus,
      pagination: Pagination,
      search?: string
    ) => {
      const { page, limit } = pagination
      const searchQuery = search ? `&search=${search}` : ''

      return api.fetch<PaginatedResponse<Interview & InterviewProgress>>(
        `/interview?page=${page}&limit=${limit}&status=${status}${searchQuery}`
      )
    },

    getInterviewList: async () => {
      return api.fetch<InterviewList[]>(`/interview/list`)
    },

    getById: (id: string) => api.fetch<Interview>(`/interview/${id}`),

    getInterviewCandidates: async (
      interview: string,
      pagination: Pagination,
      search?: string,
      stage?: HiringStage,
      status?: CandidateInterviewStatus
    ) => {
      const { page, limit } = pagination
      const stageQuery = stage ? `&stage=${stage}` : ''
      const statusQuery = status ? `&status=${status}` : ''
      const searchQuery = search ? `&search=${search}` : ''

      return api.fetch<PaginatedResponse<CandidateList>>(
        `/interview/${interview}/candidates?page=${page}&limit=${limit}${searchQuery}${stageQuery}${statusQuery}`
      )
    },

    getInvitableInterviews: async (candidateId: string) => {
      return api.fetch<InterviewList[]>(
        `/interview/candidates/${candidateId}/invitable`
      )
    },

    getCandidateInterviewDetails: async (
      candidate: string,
      interview: string
    ) => {
      return api.fetch<CandidateInterviewDetail>(
        `/interview/${interview}/candidates/${candidate}/details`
      )
    },

    create: (data: CreateInterview) =>
      api.fetch<Interview>('/interview', {
        method: 'POST',
        body: JSON.stringify(data)
      }),

    inviteCandidate: ({
      interview,
      candidates
    }: {
      interview: string
      candidates: InviteCandidate[]
    }) =>
      api.fetch<void>(`/interview/${interview}/invite`, {
        method: 'POST',
        body: JSON.stringify({ candidates })
      }),

    inviteExistingCandidate: (interview: string, candidate: string) =>
      api.fetch<Interview>(`/interview/${interview}/invite-existing`, {
        method: 'POST',
        body: JSON.stringify({ candidateId: candidate })
      }),

    update: (id: string, data: Partial<CreateInterview>) =>
      api.fetch<Interview>(`/interview/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      }),

    updateCandidateInterview: (
      interview: string,
      candidate: string,
      data: UpdateCandidateInterview
    ) =>
      api.fetch<Interview>(`/interview/${interview}/candidates/${candidate}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      })

    // delete: (id: number) =>
    //   api.fetch<void>(`/interview/${id}`, {
    //     method: 'DELETE'
    //   })
  }
}
