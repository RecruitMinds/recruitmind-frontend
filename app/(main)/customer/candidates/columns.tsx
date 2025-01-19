import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import { formatDate } from '@/lib/utils'
import { Candidate } from '@/data/types/candidate'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: 'fullName',
    header: 'Name',
    cell: ({ row }) => (
      <div className='w-full lg:min-w-52'>{row.getValue('fullName')}</div>
    )
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
    meta: {
      headerClasses: 'hidden md:table-cell',
      cellClasses: 'hidden md:table-cell'
    }
  },
  {
    accessorKey: 'interviews_count',
    header: 'Interviews',
    cell: ({ row }) => <div>{row.getValue('interviews_count')}</div>,
    meta: {
      headerClasses: 'hidden lg:table-cell',
      cellClasses: 'hidden lg:table-cell'
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last activity',
    cell: ({ row }) => <div>{formatDate(row.getValue('updatedAt'))}</div>,
    meta: {
      headerClasses: 'hidden sm:table-cell',
      cellClasses: 'hidden sm:table-cell'
    }
  },
  {
    accessorKey: '_id',
    header: '',
    cell: ({ row }) => {
      return (
        <Link href={`/customer/candidates/${row.getValue('_id')}`}>
          <Button
            variant='ghost'
            size='icon'
            className='size-10 rounded-full focus-visible:ring-0'
          >
            <ChevronRight className='size-4' />
          </Button>
        </Link>
      )
    }
  }
]
