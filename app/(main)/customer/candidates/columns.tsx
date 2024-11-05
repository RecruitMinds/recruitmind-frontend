import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import { Candidate } from '@/types'

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='w-full lg:min-w-52'>{row.getValue('name')}</div>
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
    accessorKey: 'interviews',
    header: 'Interviews',
    cell: ({ row }) => <div>{row.getValue('interviews')}</div>,
    meta: {
      headerClasses: 'hidden lg:table-cell',
      cellClasses: 'hidden lg:table-cell'
    }
  },
  {
    accessorKey: 'lastActivity',
    header: 'Last activity',
    cell: ({ row }) => <div>{row.getValue('lastActivity')}</div>,
    meta: {
      headerClasses: 'hidden sm:table-cell',
      cellClasses: 'hidden sm:table-cell'
    }
  },
  {
    id: 'view',
    header: '',
    cell: () => {
      return (
        <>
          <Button
            variant='ghost'
            size='icon'
            className='size-10 rounded-full focus-visible:ring-0'
          >
            <ChevronRight className='size-4' />
          </Button>
        </>
      )
    }
  }
]
