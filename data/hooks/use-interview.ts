import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions
} from '@tanstack/react-query'

import { interviewService } from '../services/interview'
import { PaginatedResponse, Pagination } from '../types/common'
import {
  CreateInterview,
  Interview,
  InterviewProgress,
  InviteCandidate,
  UpdateCandidateInterview
} from '../types/interview'
import {
  CandidateInterviewStatus,
  HiringStage,
  InterviewStatus
} from '../types/enums'
import { CandidateList } from '../types/candidate'

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

export function useInviteCandidate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { interview: string; candidates: InviteCandidate[] }) =>
      interviewService.inviteCandidate(data),
    onSuccess: (_, { interview }) => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] })
      queryClient.invalidateQueries({
        queryKey: ['interview-candidates', { interview }]
      })
      queryClient.invalidateQueries({
        queryKey: [...interviewKeys.all, 'paginated']
      })
    }
  })
}

export function useUpdateInterview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string
      data: Partial<CreateInterview>
    }) => interviewService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: interviewKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: interviewKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: [...interviewKeys.all, 'paginated']
      })
    }
  })
}

export function useUpdateCandidateInterview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      interview,
      candidate,
      data
    }: {
      interview: string
      candidate: string
      data: Partial<UpdateCandidateInterview>
    }) => interviewService.updateCandidateInterview(interview, candidate, data),
    onMutate: async ({ interview, candidate, data }) => {
      await queryClient.cancelQueries({
        queryKey: ['interview-candidates', { interview }]
      })

      const queries = queryClient.getQueriesData<
        PaginatedResponse<CandidateList>
      >({
        queryKey: ['interview-candidates']
      })

      const matchingQuery = queries.find(([queryKey]) => {
        const filters = queryKey[1] as { interview?: string }
        return filters?.interview === interview
      })

      if (!matchingQuery) return { previousData: null }

      const [queryKey, previousData] = matchingQuery

      queryClient.setQueryData<PaginatedResponse<CandidateList>>(
        queryKey,
        old => {
          if (!old) return old
          return {
            ...old,
            data: old.data.map(c =>
              c._id === candidate ? { ...c, ...data } : c
            )
          }
        }
      )

      return { previousData, queryKey }
    },

    onError: (err, _, context) => {
      if (context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousData)
      }
    },

    onSettled: (_, __, { interview }) => {
      queryClient.invalidateQueries({
        queryKey: ['interview-candidates', { interview }]
      })
    }
  })
}

export function useInvitableInterviews(candidateId: string, options = {}) {
  return useQuery({
    queryKey: ['invitable-interviews', candidateId],
    queryFn: () => interviewService.getInvitableInterviews(candidateId),
    ...options
  })
}

export function useInviteExistingCandidate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { interview: string; candidate: string }) =>
      interviewService.inviteExistingCandidate(data.interview, data.candidate),
    onSuccess: (_, { interview, candidate }) => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] })
      queryClient.invalidateQueries({
        queryKey: ['interview-candidates', { interview }]
      })
      queryClient.invalidateQueries({
        queryKey: ['invitable-interviews', candidate]
      })
      queryClient.invalidateQueries({
        queryKey: [...interviewKeys.all, 'paginated']
      })
    }
  })
}

// export function useDeleteInterview() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: interviewService.delete,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: interviewKeys.lists() })
//     }
//   })
// }
