import { apiClient } from '../api/client'
import { CandidateList } from '../types/candidate'
import { PaginatedResponse, Pagination } from '../types/common'
import {
  CreateInterview,
  Interview,
  InterviewList,
  InterviewProgress,
  InviteCandidate,
  UpdateCandidateInterview
} from '../types/interview'
import {
  InterviewStatus,
  HiringStage,
  CandidateInterviewStatus
} from '../types/enums'

export const interviewService = {
  getAll: async (
    status: InterviewStatus,
    pagination: Pagination,
    search?: string
  ) => {
    const { page, limit } = pagination
    const searchQuery = search ? `&search=${search}` : ''

    return apiClient.fetch<PaginatedResponse<Interview & InterviewProgress>>(
      `/interview?page=${page}&limit=${limit}&status=${status}${searchQuery}`
    )
  },

  getInterviewList: async () => {
    return apiClient.fetch<InterviewList[]>(`/interview/list`)
  },

  getById: (id: string) => apiClient.fetch<Interview>(`/interview/${id}`),

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

    return apiClient.fetch<PaginatedResponse<CandidateList>>(
      `/interview/${interview}/candidates?page=${page}&limit=${limit}${searchQuery}${stageQuery}${statusQuery}`
    )
  },

  getInvitableInterviews: async (candidateId: string) => {
    return apiClient.fetch<InterviewList[]>(
      `/interview/candidates/${candidateId}/invitable`
    )
  },

  create: (data: CreateInterview) =>
    apiClient.fetch<Interview>('/interview', {
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
    apiClient.fetch<void>(`/interview/${interview}/invite`, {
      method: 'POST',
      body: JSON.stringify({ candidates })
    }),

  inviteExistingCandidate: (interview: string, candidate: string) =>
    apiClient.fetch<Interview>(`/interview/${interview}/invite-existing`, {
      method: 'POST',
      body: JSON.stringify({ candidateId: candidate })
    }),

  update: (id: string, data: Partial<CreateInterview>) =>
    apiClient.fetch<Interview>(`/interview/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  updateCandidateInterview: (
    interview: string,
    candidate: string,
    data: UpdateCandidateInterview
  ) =>
    apiClient.fetch<Interview>(
      `/interview/${interview}/candidates/${candidate}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data)
      }
    )

  // delete: (id: number) =>
  //   apiClient.fetch<void>(`/interview/${id}`, {
  //     method: 'DELETE'
  //   })
}
