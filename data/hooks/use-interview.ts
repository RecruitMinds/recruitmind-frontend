import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { interviewService } from '../services/interview'
import { PaginatedResponse, Pagination } from '../types/common'
import {
  Interview,
  InterviewProgress,
  InterviewStatus
} from '../types/interview'
import { CandidateInterviewStatus, HiringStage } from '../types/candidate'

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
    queryKey: ['interviews', pagination, search, status],
    queryFn: () => interviewService.getAll(status, pagination, search),
    placeholderData: keepPreviousData
  })
}

export function useInterviewList() {
  return useQuery({
    queryKey: ['interviews-list'],
    queryFn: () => interviewService.getInterviewList()
  })
}

export function useInterview(id: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['interviews', 'detail', id],
    queryFn: () => interviewService.getById(id),
    enabled: !!id,
    initialData: () => {
      // Try to get interview from existing queries
      const interviews = queryClient
        .getQueriesData<PaginatedResponse<Interview & InterviewProgress>>({
          queryKey: ['interviews']
        })
        .find(([, data]) => data?.data.some(interview => interview._id === id))

      return interviews?.[1]?.data.find(interview => interview._id === id)
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
    queryKey: [
      'interview-candidates',
      interview,
      pagination,
      search,
      stage,
      status
    ],
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

// export function useInterview(id: number) {
//   return useQuery({
//     queryKey: interviewKeys.detail(id),
//     queryFn: () => interviewService.getById(id),
//     enabled: !!id
//   })
// }

// export function useCreateInterview() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: Omit<Interview, 'id'>) => interviewService.create(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: interviewKeys.lists() })
//     }
//   })
// }

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
