import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Pagination } from '../types/common'
import { candidateService } from '../services/candidate'

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
