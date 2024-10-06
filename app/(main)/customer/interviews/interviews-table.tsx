'use client'

import React, { useState } from 'react'
import {
  Archive,
  CalendarFold,
  ChevronRight,
  Copy,
  MoreVertical,
  Pencil,
  PencilLine
} from 'lucide-react'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const data: Interview[] = [
  {
    id: 'm5gr84i9',
    name: '.NET Developer - Sri Lanka - Remote',
    candidates: 1,
    progress: {
      completed: 1,
      started: 0,
      notStarted: 0,
      disqualified: 0
    },
    lastActivity: '5 days ago',
    dateCreated: 'Sep 30, 2024',
    dateExpires: null,
    status: 'active'
  },
  {
    id: '3u1reuv4',
    name: 'Frontend Developer - Remote',
    candidates: 1,
    progress: {
      completed: 1,
      started: 1,
      notStarted: 0,
      disqualified: 0
    },
    lastActivity: '5 days ago',
    dateCreated: 'Sep 30, 2024',
    dateExpires: null,
    status: 'active'
  },
  {
    id: '2a23fdra',
    name: 'Full Stack Engineer - UK Remote',
    candidates: 1,
    progress: {
      completed: 17,
      started: 1,
      notStarted: 1,
      disqualified: 1
    },
    lastActivity: '5 days ago',
    dateCreated: 'Sep 30, 2024',
    dateExpires: null,
    status: 'active'
  }
]

export type Interview = {
  id: string
  name: string
  candidates: number
  progress: {
    completed: number
    started: number
    notStarted: number
    disqualified: number
  }
  status: 'active' | 'inactive' | 'archived'
  lastActivity: string
  dateCreated: string
  dateExpires: string | null
}

export const columns: ColumnDef<Interview>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='w-full xl:min-w-80'>{row.getValue('name')}</div>
    )
  },
  {
    accessorKey: 'candidates',
    header: 'Candidates',
    cell: ({ row }) => <div>{row.getValue('candidates')}</div>
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const { completed, started, notStarted, disqualified } = row.getValue(
        'progress'
      ) as Interview['progress']

      const total = completed + started + notStarted + disqualified
      const completedPercentage = (completed / total) * 100
      const startedPercentage = (started / total) * 100
      const notStartedPercentage = (notStarted / total) * 100
      const disqualifiedPercentage = (disqualified / total) * 100

      return (
        <>
          <div className='hidden h-7 w-full min-w-60 items-center justify-center pr-6 font-medium md:flex'>
            {completed > 0 && (
              <div
                className='flex h-full items-center justify-center bg-lime-400'
                style={{ width: `${completedPercentage}%` }}
              >
                {completed}
              </div>
            )}
            {started > 0 && (
              <div
                className='flex h-full items-center justify-center bg-orange-200'
                style={{ width: `${startedPercentage}%` }}
              >
                {started}
              </div>
            )}
            {notStarted > 0 && (
              <div
                className='flex h-full items-center justify-center bg-gray-300'
                style={{ width: `${notStartedPercentage}%` }}
              >
                {notStarted}
              </div>
            )}
            {disqualified > 0 && (
              <div
                className='flex h-full items-center justify-center bg-red-300'
                style={{ width: `${disqualifiedPercentage}%` }}
              >
                {disqualified}
              </div>
            )}
          </div>
          <div className='md:hidden'>{completedPercentage} %</div>
        </>
      )
    }
  },
  {
    accessorKey: 'lastActivity',
    header: 'Last activity',
    cell: ({ row }) => <div>{row.getValue('lastActivity')}</div>
  },
  {
    accessorKey: 'dateCreated',
    header: 'Date created',
    cell: ({ row }) => <div>{row.getValue('dateCreated')}</div>
  },
  {
    accessorKey: 'dateExpires',
    header: 'Expires',
    cell: ({ row }) => (
      <div>
        {row.getValue('dateExpires') === null
          ? '_'
          : row.getValue('dateExpires')}
      </div>
    )
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: () => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='hidden md:flex'>
              <Button
                variant='ghost'
                size='icon'
                className='size-10 rounded-full focus-visible:ring-0'
              >
                <MoreVertical className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-60 rounded-[10px] border-none text-foreground/80 shadow-md'
            >
              <DropdownMenuItem className='h-12 gap-x-3 rounded-none px-4'>
                <Pencil className='size-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className='h-12 gap-x-3 rounded-none px-4'>
                <PencilLine className='size-4' />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className='h-12 gap-x-3 rounded-none px-4'>
                <Copy className='size-4' />
                Clone
              </DropdownMenuItem>
              <DropdownMenuItem className='h-12 gap-x-3 rounded-none px-4'>
                <Archive className='size-4' /> Archive
              </DropdownMenuItem>
              <DropdownMenuItem className='h-12 gap-x-3 rounded-none px-4'>
                <CalendarFold className='size-4' />
                Set expiry date
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant='ghost'
            size='icon'
            className='size-10 rounded-full focus-visible:ring-0 md:hidden'
          >
            <ChevronRight className='size-4' />
          </Button>
        </>
      )
    }
  }
]

const headerClasses = {
  lastActivity: 'hidden lg:table-cell',
  dateCreated: 'hidden lg:table-cell',
  dateExpires: 'hidden xl:table-cell',
  actions: 'hidden md:table-cell',
  candidates: 'hidden sm:table-cell',
  progress: 'hidden sm:table-cell'
}

const cellClasses = {
  lastActivity: 'hidden lg:table-cell',
  dateCreated: 'hidden lg:table-cell',
  dateExpires: 'hidden xl:table-cell',
  candidates: 'hidden sm:table-cell',
  progress: 'hidden sm:table-cell'
}

const InterviewsTable = () => {
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
    <Table className='table-auto'>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id} className='h-14 hover:bg-white'>
            {headerGroup.headers.map(header => (
              <TableHead
                key={header.id}
                className={cn(
                  'text-sm font-bold text-foreground first:pl-6 first:text-left last:pr-6 last:text-right',
                  headerClasses[header.column.id as keyof typeof headerClasses]
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className='h-14 text-sm leading-tight text-foreground/80 hover:bg-primary/10'
            >
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    'first:pl-6 first:text-left last:pr-6 last:text-right',
                    cellClasses[cell.column.id as keyof typeof cellClasses]
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default InterviewsTable
