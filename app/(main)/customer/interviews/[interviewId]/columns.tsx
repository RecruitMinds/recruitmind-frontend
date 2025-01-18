import * as React from 'react'
import {
  Copy,
  EllipsisVertical,
  Mail,
  Settings,
  Trash2,
  UserX
} from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import StarRating from '@/components/star-rating'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { CandidateList } from '@/data/types/candidate'
import { formatSnakeCase, toShortDate } from '@/lib/utils'

export const getColumns = (
  is_include_technical_assessment: boolean
): ColumnDef<CandidateList>[] => {
  const columns: ColumnDef<CandidateList>[] = [
    {
      accessorKey: 'fullName',
      header: 'Name',
      cell: ({ row }) => (
        <div className='min-w-48'>{row.getValue('fullName')}</div>
      ),
      meta: {
        headerClasses:
          'sticky left-0 z-10 transition-shadow duration-200 [div[data-scrolled-start="true"]_&]:bg-white [div[data-scrolled-start="true"]_&]:drop-shadow-xl',
        cellClasses:
          'sticky left-0 z-10 bg-white before:absolute before:inset-0 before:-z-10 before:bg-primary/10 before:opacity-0 before:duration-150 group-hover:before:opacity-100 [div[data-scrolled-start="true"]_&]:drop-shadow-xl'
      }
    },
    {
      accessorKey: 'overallScore',
      header: 'Overall',
      cell: ({ row }) => {
        const score = row.getValue('overallScore')
        return <div className='min-w-28 pl-4'>{score ? `${score}%` : '_'}</div>
      },
      meta: {
        headerClasses: 'pl-4'
      }
    },
    {
      accessorKey: 'technicalSkills',
      header: 'Technical Skills',
      cell: ({ row }) => {
        const score = row.original.technicalInterview.technicalSkillsScore
        return <div>{score ? `${score}%` : '_'}</div>
      },
      meta: {
        headerClasses: 'max-w-44 pr-12 truncate',
        cellClasses: 'font-medium'
      }
    },

    {
      accessorKey: 'softSkills',
      header: 'Soft Skills',
      cell: ({ row }) => {
        const score = row.original.technicalInterview.softSkillsScore
        return <div>{score ? `${score}%` : '_'}</div>
      },
      meta: {
        headerClasses: 'max-w-44 pr-12 truncate',
        cellClasses: 'font-medium'
      }
    },
    {
      accessorKey: 'stage',
      header: 'Hiring stage',
      cell: ({ row }) => (
        <div className='min-w-48'>{formatSnakeCase(row.getValue('stage'))}</div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className='min-w-48'>
          {formatSnakeCase(row.getValue('status'))}
        </div>
      )
    },
    {
      accessorKey: 'createdAt',
      header: 'Invited on',
      cell: ({ row }) => (
        <div className='min-w-32'>{toShortDate(row.getValue('createdAt'))}</div>
      )
    },
    {
      accessorKey: 'rating',
      header: 'Overall rating',
      cell: ({ row }) => (
        <div className='min-w-36'>
          <StarRating
            totalStars={5}
            initialRating={row.getValue('rating') ?? 0}
            readOnly={true}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='ml-auto hidden md:flex'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='size-10 rounded-full focus-visible:ring-0'
                  onClick={() => {}}
                >
                  <EllipsisVertical className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='rounded-[10px] border-none text-foreground/80 shadow-md'
              >
                <DropdownMenuItem className='h-12 gap-x-3 rounded-none px-4'>
                  <Copy className='size-4' />
                  Copy candidate interview link
                </DropdownMenuItem>
                <DropdownMenuItem className='h-12 gap-x-3 rounded-none px-4'>
                  <Mail className='size-4' />
                  Send results
                </DropdownMenuItem>
                <DropdownMenuItem className='h-12 gap-x-3 rounded-none px-4'>
                  <UserX className='size-4' />
                  Reject
                </DropdownMenuItem>

                <DropdownMenuItem className='h-12 gap-x-3 rounded-none px-4 text-destructive focus:text-destructive'>
                  <Trash2 className='size-4' />
                  Delete candidate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
      meta: {
        headerClasses:
          'z-10 min-w-24 transition-shadow duration-200 [div[data-scrolled-end="false"]_&]:bg-transparent [div[data-scrolled-end="false"]_&]:drop-shadow-none [div[data-scrolled-end="true"]_&]:sticky [div[data-scrolled-end="true"]_&]:right-0 [div[data-scrolled-end="true"]_&]:bg-white [div[data-scrolled-end="true"]_&]:drop-shadow-xl',
        cellClasses:
          'z-10 bg-white transition-shadow duration-200 before:absolute before:inset-0 before:-z-10 before:bg-primary/10 before:opacity-0 before:duration-150 group-hover:before:opacity-100 [div[data-scrolled-end="false"]_&]:drop-shadow-none [div[data-scrolled-end="true"]_&]:sticky [div[data-scrolled-end="true"]_&]:right-0 [div[data-scrolled-end="true"]_&]:drop-shadow-xl'
      }
    }
  ]

  if (is_include_technical_assessment) {
    columns.splice(3, 0, {
      accessorKey: 'technicalAssessment',
      header: 'Problem-Solving Skills',
      cell: ({ row }) => {
        const score = row.original.technicalAssessment.totalScore
        return <div>{score ? `${score}%` : '_'}</div>
      },
      meta: {
        headerClasses: 'max-w-44 pr-12 truncate',
        cellClasses: 'font-medium'
      }
    })
  }

  return columns
}
