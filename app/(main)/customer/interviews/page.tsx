'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  PaginationState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useDebounceValue } from 'usehooks-ts'

import { columns } from './columns'
import { InterviewStatus } from '@/data/types/enums'
import { useInterviews } from '@/data/hooks/use-interview'

import FilterTabs from './filter-tabs'
import Loading from '@/components/loading'
import SearchBar from '@/components/searchbar'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/data-table'
import Pagination from '@/components/pagination'

const InterviewsPage = () => {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [search, setValue] = useDebounceValue('', 500)
  const [status, setStatus] = useState<InterviewStatus>(InterviewStatus.ACTIVE)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const { data: interviews, isLoading: loadingInterviews } = useInterviews({
    status,
    pagination: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
    search
  })

  const table = useReactTable({
    data: interviews?.data ?? [],
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: interviews?.meta.totalPages,
    manualPagination: true,
    state: {
      sorting,
      pagination
    }
  })

  if (loadingInterviews) return <Loading />

  return (
    <div className='mt-16 pb-24'>
      <div className='container flex flex-col gap-10'>
        <div className='mt-10 flex items-center justify-between'>
          <h1 className='text-3xl font-bold leading-8'>Interviews</h1>

          <Link href={'/customer/interviews/new'}>
            <Button size={'rounded'} className='gap-x-2'>
              <Plus />
              Create interview
            </Button>
          </Link>
        </div>

        <div className='flex flex-col items-center justify-between gap-5 md:flex-row md:gap-8 lg:gap-0'>
          <SearchBar
            className='md:max-w-[460px]'
            placeholder='Search'
            onChange={e => setValue(e.target.value)}
          />
          <FilterTabs activeStatus={status} onStatusChange={setStatus} />
        </div>

        <div className='-mt-3 w-full overflow-hidden rounded-[10px] border bg-white md:mt-0'>
          <DataTable
            table={table}
            columns={columns}
            viewRow={(id: string) => router.push(`/customer/interviews/${id}`)}
            idField='_id'
          />
          <Pagination table={table} totalItems={interviews?.meta.total} />
        </div>
      </div>
    </div>
  )
}

export default InterviewsPage
