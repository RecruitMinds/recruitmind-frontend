import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { Pagination } from '../types/common'
import { candidateService } from '../services/candidate'
import { toast } from 'sonner'

export function useCandidates({
  pagination,
  interview,
  search
}: {
  pagination: Pagination
  interview?: string
  search?: string
}) {
  return useQuery({
    queryKey: ['candidates', pagination, interview, search],
    queryFn: () => candidateService.getAll(pagination, interview, search),
    placeholderData: keepPreviousData
  })
}

export function useCandidate(candidateId: string, options = {}) {
  return useQuery({
    queryKey: ['candidates', 'detail', candidateId],
    queryFn: () => candidateService.get(candidateId),
    ...options
  })
}

export function useDeleteCandidate() {
  const queryClient = useQueryClient()

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
