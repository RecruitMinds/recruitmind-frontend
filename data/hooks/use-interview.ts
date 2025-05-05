import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { useInterviewService } from '../services/interview'
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
  const service = useInterviewService()

  return useQuery({
    queryKey: interviewKeys.paginated({ status, pagination, search }),
    queryFn: () => service.getAll(status, pagination, search),
    placeholderData: keepPreviousData
  })
}

export function useInterviewList() {
  const service = useInterviewService()

  return useQuery({
    queryKey: interviewKeys.lists(),
    queryFn: () => service.getInterviewList()
  })
}

export function useInterview(id: string) {
  const queryClient = useQueryClient()
  const service = useInterviewService()

  return useQuery({
    queryKey: interviewKeys.detail(id),
    queryFn: () => service.getById(id),
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
  const service = useInterviewService()

  return useQuery({
    queryKey: interviewKeys.candidates({
      interview,
      pagination,
      search,
      stage,
      status
    }),
    queryFn: () =>
      service.getInterviewCandidates(
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
  const service = useInterviewService()

  return useMutation({
    mutationFn: (data: CreateInterview) => service.create(data),
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
  const service = useInterviewService()

  return useMutation({
    mutationFn: (data: { interview: string; candidates: InviteCandidate[] }) =>
      service.inviteCandidate(data),
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
  const service = useInterviewService()

  return useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string
      data: Partial<CreateInterview>
    }) => service.update(id, data),
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
  const service = useInterviewService()

  return useMutation({
    mutationFn: ({
      interview,
      candidate,
      data
    }: {
      interview: string
      candidate: string
      data: Partial<UpdateCandidateInterview>
    }) => service.updateCandidateInterview(interview, candidate, data),
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

    onSettled: (_, __, { interview, candidate }) => {
      queryClient.invalidateQueries({
        queryKey: ['interview-candidates', { interview }]
      })
      queryClient.invalidateQueries({
        queryKey: ['candidate-interview-details', candidate, interview]
      })
    }
  })
}

export function useInvitableInterviews(candidateId: string, options = {}) {
  const service = useInterviewService()

  return useQuery({
    queryKey: ['invitable-interviews', candidateId],
    queryFn: () => service.getInvitableInterviews(candidateId),
    ...options
  })
}

export function useInviteExistingCandidate() {
  const queryClient = useQueryClient()
  const service = useInterviewService()

  return useMutation({
    mutationFn: (data: { interview: string; candidate: string }) =>
      service.inviteExistingCandidate(data.interview, data.candidate),
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

export function useCandidateInterviewDetails(
  candidateId: string,
  interviewId: string,
  options = {}
) {
  const service = useInterviewService()

  return useQuery({
    queryKey: ['candidate-interview-details', candidateId, interviewId],
    queryFn: () =>
      service.getCandidateInterviewDetails(candidateId, interviewId),
    ...options
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
