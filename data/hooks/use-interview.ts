import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { interviewService } from '../services/interview'
import { PaginatedResponse, Pagination } from '../types/common'
import {
  CreateInterview,
  Interview,
  InterviewProgress,
  InterviewStatus
} from '../types/interview'
import { CandidateInterviewStatus, HiringStage } from '../types/candidate'

const interviewKeys = {
  all: ['interviews'] as const,
  lists: () => [...interviewKeys.all, 'list'] as const,
  paginated: (filters: {
    status: InterviewStatus
    pagination: Pagination
    search?: string
  }) => [...interviewKeys.all, 'paginated', filters] as const,
  detail: (id: string) => [...interviewKeys.all, 'detail', id] as const,
  candidates: (filters: {
    interview: string
    pagination: Pagination
    search?: string
    stage?: HiringStage
    status?: CandidateInterviewStatus
  }) => ['interview-candidates', filters] as const
}

export function useInterviews({
  status,
  pagination,
  search
}: {
  status: InterviewStatus
  pagination: Pagination
  search?: string
}) {
  return useQuery({
    queryKey: interviewKeys.paginated({ status, pagination, search }),
    queryFn: () => interviewService.getAll(status, pagination, search),
    placeholderData: keepPreviousData
  })
}

export function useInterviewList() {
  return useQuery({
    queryKey: interviewKeys.lists(),
    queryFn: () => interviewService.getInterviewList()
  })
}

export function useInterview(id: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: interviewKeys.detail(id),
    queryFn: () => interviewService.getById(id),
    enabled: !!id,
    initialData: () => {
      // Try to get interview from existing queries
      const interviews = queryClient
        .getQueriesData<PaginatedResponse<Interview & InterviewProgress>>({
          queryKey: ['interviews']
        })
        .find(([, data]) => data?.data?.some(interview => interview._id === id))

      if (!interviews?.[1]?.data) return undefined
      return interviews[1].data.find(interview => interview._id === id)
    }
  })
}

export function useInterviewCandidates({
  interview,
  pagination,
  search,
  stage,
  status
}: {
  interview: string
  pagination: Pagination
  search?: string
  stage?: HiringStage
  status?: CandidateInterviewStatus
}) {
  return useQuery({
    queryKey: interviewKeys.candidates({
      interview,
      pagination,
      search,
      stage,
      status
    }),
    queryFn: () =>
      interviewService.getInterviewCandidates(
        interview,
        pagination,
        search,
        stage,
        status
      ),
    placeholderData: keepPreviousData
  })
}

export function useCreateInterview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateInterview) => interviewService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interviewKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: [...interviewKeys.all, 'paginated']
      })
    }
  })
}

// export function useUpdateInterview() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({ id, data }: { id: number; data: Partial<Interview> }) =>
//       interviewService.update(id, data),
//     onSuccess: (_, { id }) => {
//       queryClient.invalidateQueries({ queryKey: interviewKeys.detail(id) })
//       queryClient.invalidateQueries({ queryKey: interviewKeys.lists() })
//     }
//   })
// }

// export function useDeleteInterview() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: interviewService.delete,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: interviewKeys.lists() })
//     }
//   })
// }
