'use client'

import { use, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  PaginationState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  BriefcaseBusiness,
  ChevronLeft,
  EllipsisVertical,
  Eye,
  Languages,
  MapPin,
  SendHorizontal
} from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'
import { toast } from 'sonner'

import {
  useInterview,
  useInterviewCandidates,
  useUpdateCandidateInterview
} from '@/data/hooks/use-interview'
import { useInviteModal } from '@/store/use-invite-modal'
import { useDeleteCandidate } from '@/data/hooks/use-candidate'
import { CandidateInterviewStatus, HiringStage } from '@/data/types/enums'

import Filters from './filters'
import { getColumns } from './columns'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/data-table'
import Pagination from '@/components/pagination'
import InviteModal from '@/components/modal/invite-modal'

const INITIAL_PAGE_SIZE = 10

const InterviewPage = ({
  params
}: {
  params: Promise<{ interviewId: string }>
}) => {
  const router = useRouter()
  const { interviewId } = use(params)
  const { onOpen: openInviteModal } = useInviteModal()
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchQuery, setSearchQuery] = useDebounceValue('', 500)
  const [hiringStage, setHiringStage] = useState<HiringStage>()
  const [status, setStatus] = useState<CandidateInterviewStatus>()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: INITIAL_PAGE_SIZE
  })

  const { data: interview, isLoading: loadingInterview } =
    useInterview(interviewId)
  const { data: candidates, isLoading: loadingCandidates } =
    useInterviewCandidates({
      interview: interviewId,
      pagination: {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize
      },
      search: searchQuery,
      stage: hiringStage,
      status
    })

  const { mutateAsync: deleteCandidate } = useDeleteCandidate()
  const {
    mutateAsync: updateStage,
    isPending: updatingStage,
    variables: updateVars
  } = useUpdateCandidateInterview()

  const handleStageUpdate = async (candidateId: string, stage: HiringStage) => {
    await updateStage(
      {
        candidate: candidateId,
        interview: interviewId,
        data: { stage }
      },
      { onError: () => toast.error('Failed to update hiring stage') }
    )
  }

  const isUpdatingCandidate = (candidateId: string) => {
    return updatingStage && updateVars?.candidate === candidateId
  }

  const hasTechnicalAssessment = useMemo(() => {
    return Boolean(interview?.includeTechnicalAssessment)
  }, [interview?.includeTechnicalAssessment])

  const tableColumns = getColumns(
    hasTechnicalAssessment,
    handleStageUpdate,
    isUpdatingCandidate,
    deleteCandidate
  )

  const table = useReactTable({
    data: candidates?.data ?? [],
    columns: tableColumns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: candidates?.meta.totalPages,
    manualPagination: true,
    state: { sorting, pagination }
  })

  if (loadingInterview || loadingCandidates) {
    return <Loading />
  }

  const navigateToCandidate = (id: string) => {
    router.push(`/customer/interviews/${interviewId}/candidates/${id}`)
  }

  return (
    <>
      <div className='flex flex-col gap-11 pb-12 pt-[60px]'>
        <header className='flex h-20 items-center border-b bg-background'>
          <div className='container flex items-center'>
            <Button
              variant='outline'
              size='rounded'
              className='mr-5 border-accent-foreground px-3.5'
              onClick={() => router.back()}
            >
              <ChevronLeft className='size-4 stroke-2' />
            </Button>

            <div className='flex items-center gap-10'>
              <div className='flex items-center gap-3'>
                <div className='-mt-1'>
                  <h2 className='text-xl font-bold leading-8 text-foreground'>
                    {interview?.name}
                  </h2>
                  <div className='flex items-center text-sm text-muted-foreground'>
                    <div className='flex items-center gap-5 leading-tight'>
                      <div className='flex items-center gap-1.5'>
                        <MapPin className='size-4 stroke-2' />
                        <span>{interview?.location}</span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <BriefcaseBusiness className='size-4 stroke-2' />
                        <span>Senior</span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <Languages className='size-4 stroke-2' />
                        <span>English</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='ml-auto flex items-center gap-4'>
              <Button
                variant='outline'
                size='rounded'
                className='border-accent-foreground px-3.5'
              >
                <EllipsisVertical className='size-5 stroke-2' />
              </Button>
              <Button
                variant='outline'
                size='rounded'
                className='border-accent-foreground px-3.5'
              >
                <Eye className='size-5 stroke-2' />
              </Button>
              <Button
                size='rounded'
                onClick={openInviteModal}
                className='flex items-center gap-2.5'
              >
                <SendHorizontal size={20} /> Invite
              </Button>
            </div>
          </div>
        </header>

        <main className='container'>
          <div className='-mt-3 w-full overflow-hidden rounded-[10px] border bg-white md:mt-0'>
            <div className='flex items-center justify-between border-b px-6 py-4'>
              <strong>Candidates</strong>
              <Filters
                onSearchChange={setSearchQuery}
                onStageChange={setHiringStage}
                onStatusChange={setStatus}
              />
            </div>
            <DataTable
              table={table}
              columns={tableColumns}
              viewRow={navigateToCandidate}
              idField='_id'
            />
            <Pagination table={table} totalItems={candidates?.meta.total} />
          </div>
        </main>
      </div>
      <InviteModal interviewwId={interviewId} />
    </>
  )
}

export default InterviewPage
