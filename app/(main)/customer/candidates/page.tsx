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
import { useCandidates } from '@/data/hooks/use-candidate'

import { Button } from '@/components/ui/button'
import FilterOptions from './filter-options'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/searchbar'
import DataTable from '@/components/data-table'

const CandidatesPage = () => {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [search, setValue] = useDebounceValue('', 500)
  const [interviewFilter, setinterviewFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const { data: candidates } = useCandidates({
    pagination: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
    search,
    interview: interviewFilter
  })

  const table = useReactTable({
    data: candidates?.data ?? [],
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: candidates?.meta.totalPages,
    manualPagination: true,
    state: {
      sorting,
      pagination
    }
  })

  return (
    <div className='mt-16 pb-24'>
      <div className='container flex flex-col gap-10'>
        <div className='mt-10 flex items-center justify-between'>
          <h1 className='text-3xl font-bold leading-8'>Candidates</h1>

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
            placeholder='Search any candidate by name'
            onChange={e => setValue(e.target.value)}
          />
          <FilterOptions setInterviewFilter={setinterviewFilter} />
        </div>

        <div className='-mt-3 w-full overflow-hidden rounded-[10px] border bg-white md:mt-0'>
          <DataTable
            table={table}
            columns={columns}
            viewRow={(id: string) => router.push(`/customer/candidates/${id}`)}
            idField='_id'
          />
          <Pagination table={table} totalItems={candidates?.meta.total} />
        </div>
      </div>
    </div>
  )
}

export default CandidatesPage
