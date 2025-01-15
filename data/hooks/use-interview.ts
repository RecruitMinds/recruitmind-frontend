import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { interviewService } from '../services/interview'
import { Pagination } from '../types/common'
import { InterviewStatus } from '../types/interview'

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
