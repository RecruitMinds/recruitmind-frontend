import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { toast } from 'sonner'

import { Pagination } from '../types/common'
import { useCandidateService } from '../services/candidate'

export function useCandidates({
  pagination,
  interview,
  search
}: {
  pagination: Pagination
  interview?: string
  search?: string
}) {
  const candidateService = useCandidateService()

  return useQuery({
    queryKey: ['candidates', pagination, interview, search],
    queryFn: () => candidateService.getAll(pagination, interview, search),
    placeholderData: keepPreviousData
  })
}

export function useCandidate(candidateId: string, options = {}) {
  const candidateService = useCandidateService()

  return useQuery({
    queryKey: ['candidates', 'detail', candidateId],
    queryFn: () => candidateService.get(candidateId),
    ...options
  })
}

export function useDeleteCandidate() {
  const queryClient = useQueryClient()
  const candidateService = useCandidateService()

  return useMutation({
    mutationFn: (candidateId: string) => candidateService.delete(candidateId),
    onSuccess: () => {
      toast.success('Delete candidate.')
      queryClient.invalidateQueries({ queryKey: ['candidates'] })
      queryClient.invalidateQueries({
        queryKey: ['interview-candidates']
      })
      queryClient.invalidateQueries({
        queryKey: ['interviews', 'paginated']
      })
    }
  })
}
