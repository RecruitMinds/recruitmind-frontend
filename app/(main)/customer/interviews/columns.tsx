import * as React from 'react'
import {
  Archive,
  CalendarFold,
  ChevronRight,
  Copy,
  MoreVertical,
  Pencil,
  PencilLine
} from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Interview } from '@/types'

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
    cell: ({ row }) => <div>{row.getValue('candidates')}</div>,
    meta: {
      headerClasses: 'hidden sm:table-cell',
      cellClasses: 'hidden sm:table-cell'
    }
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
    },
    meta: {
      headerClasses: 'hidden sm:table-cell',
      cellClasses: 'hidden sm:table-cell'
    }
  },
  {
    accessorKey: 'lastActivity',
    header: 'Last activity',
    cell: ({ row }) => <div>{row.getValue('lastActivity')}</div>,
    meta: {
      headerClasses: 'hidden lg:table-cell',
      cellClasses: 'hidden lg:table-cell'
    }
  },
  {
    accessorKey: 'dateCreated',
    header: 'Date created',
    cell: ({ row }) => <div>{row.getValue('dateCreated')}</div>,
    meta: {
      headerClasses: 'hidden lg:table-cell',
      cellClasses: 'hidden lg:table-cell'
    }
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
    ),
    meta: {
      headerClasses: 'hidden xl:table-cell',
      cellClasses: 'hidden xl:table-cell'
    }
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
    },
    meta: {
      headerClasses: 'hidden md:table-cell'
    }
  }
]
