'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { data } from '@/data/interviews'
import { cellClasses, columns, headerClasses } from './columns'

import { Button } from '@/components/ui/button'
import FilterTabs from './filter-tabs'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/searchbar'
import DataTable from '@/components/data-table'

const InterviewsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  })

  return (
    <div className='mt-16 pb-24'>
      <div className='container flex flex-col gap-10'>
        <div className='mt-10 flex items-center justify-between'>
          <h1 className='text-3xl font-bold leading-8'>Interviews</h1>

          <Button size={'rounded'} className='gap-x-2'>
            <Plus />
            Create interview
          </Button>
        </div>

        <div className='flex flex-col items-center justify-between gap-5 md:flex-row md:gap-8 lg:gap-0'>
          <SearchBar className='md:max-w-[460px]' placeholder='Search' />
          <FilterTabs />
        </div>

        <div className='-mt-3 w-full overflow-hidden rounded-[10px] border bg-white md:mt-0'>
          <DataTable
            table={table}
            columns={columns}
            headerClasses={headerClasses}
            cellClasses={cellClasses}
          />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default InterviewsPage
