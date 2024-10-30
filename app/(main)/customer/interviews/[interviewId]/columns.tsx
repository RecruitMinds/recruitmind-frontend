import * as React from 'react'
import { EllipsisVertical, Settings } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import { CandidateList } from '@/types'
import StarRating from '@/components/star-rating'

export const getColumns = (criterias: string[]): ColumnDef<CandidateList>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className='min-w-48'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'overall',
    header: 'Overall',
    cell: ({ row }) => <div className='min-w-32'>{row.getValue('overall')}</div>
  },
  ...criterias.map(
    criteria =>
      ({
        accessorKey: `scores[${criteria}]`,
        header: criteria,
        cell: ({ row }) => {
          const scores = row.original.scores as Record<string, string>

          return <div className='min-w-48'>{scores[`${criteria}`]}</div>
        }
      }) as ColumnDef<CandidateList>
  ),
  {
    accessorKey: 'stage',
    header: 'Hiring stage',
    cell: ({ row }) => <div className='min-w-48'>{row.getValue('stage')}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className='min-w-48'>{row.getValue('status')}</div>
  },
  {
    accessorKey: 'invitedOn',
    header: 'Invited on',
    cell: ({ row }) => (
      <div className='min-w-48'>{row.getValue('invitedOn')}</div>
    )
  },
  {
    accessorKey: 'overallRating',
    header: 'Overall rating',
    cell: ({ row }) => (
      <div className='min-w-36'>
        <StarRating
          totalStars={5}
          initialRating={row.getValue('overallRating')}
        />
      </div>
    )
  },
  {
    id: 'settings',
    header: () => (
      <Button variant='ghost' size='icon'>
        <Settings />
      </Button>
    ),
    cell: () => {
      return (
        <>
          <Button
            variant='ghost'
            size='icon'
            className='size-10 rounded-full focus-visible:ring-0'
          >
            <EllipsisVertical className='size-4' />
          </Button>
        </>
      )
    }
  }
]

export const headerClasses = {
  overall: 'hidden md:table-cell',
  'scores[Core .NET Technical Expertise]': '',
  'scores[Professional Skills and Collaboration]': 'truncate max-w-16',
  interviews: 'hidden lg:table-cell',
  lastActivity: 'hidden sm:table-cell'
}

export const cellClasses = {
  email: 'hidden md:table-cell',
  interviews: 'hidden lg:table-cell',
  lastActivity: 'hidden sm:table-cell'
}
