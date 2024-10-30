'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
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

import { data } from '@/data/candidate-list'

import { Button } from '@/components/ui/button'
import DataTable from '@/components/data-table'
import Pagination from '@/components/pagination'
import { getColumns } from './columns'
import SearchBar from '@/components/searchbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const criterias_evaluated = [
  'Core .NET Technical Expertise',
  'Architecture and Development Practices',
  'Problem-Solving and Technical Analysis',
  'Professional Skills and Collaboration'
]

const InterviewPage = () => {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns: getColumns(criterias_evaluated),
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
    <div className='flex flex-col gap-11 pb-12 pt-[60px]'>
      <div className='flex h-20 items-center border-b bg-background'>
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
                  .NET Developer - Sri Lanka - Remote
                </h2>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <div className='flex items-center gap-5 leading-tight'>
                    <div className='flex items-center gap-1.5'>
                      <MapPin className='size-4 stroke-2' />
                      <span>Sri Lanka</span>
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
            <Button size='rounded' className='flex items-center gap-2.5'>
              <SendHorizontal size={20} /> Invite
            </Button>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='-mt-3 w-full overflow-hidden rounded-[10px] border bg-white md:mt-0'>
          <div className='flex items-center justify-between border-b px-6 py-4'>
            <strong>Candidates</strong>
            <div className='flex items-center gap-6'>
              <SearchBar placeholder='Search' className='text-sm' />

              <Select>
                <SelectTrigger className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black md:w-56'>
                  <SelectValue placeholder='Stage' />
                </SelectTrigger>
                <SelectContent className='w-full md:w-56'>
                  <SelectItem value='.net' className='h-12 rounded-none'>
                    .NET Developer
                  </SelectItem>
                  <SelectItem value='java' className='h-12 rounded-none'>
                    Java Developer
                  </SelectItem>
                  <SelectItem value='javascript' className='h-12 rounded-none'>
                    JavaScript Developer
                  </SelectItem>
                  <SelectItem value='python' className='h-12 rounded-none'>
                    Python Developer
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black md:w-56'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent className='w-full md:w-56'>
                  <SelectItem value='.net' className='h-12 rounded-none'>
                    .NET Developer
                  </SelectItem>
                  <SelectItem value='java' className='h-12 rounded-none'>
                    Java Developer
                  </SelectItem>
                  <SelectItem value='javascript' className='h-12 rounded-none'>
                    JavaScript Developer
                  </SelectItem>
                  <SelectItem value='python' className='h-12 rounded-none'>
                    Python Developer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DataTable
            table={table}
            columns={getColumns(criterias_evaluated)}
            viewRow={(id: string) => router.push(`/customer/candidates/${id}`)}
          />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default InterviewPage
