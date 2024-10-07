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
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'interviews',
    header: 'Interviews',
    cell: ({ row }) => <div>{row.getValue('interviews')}</div>
  },
  {
    accessorKey: 'lastActivity',
    header: 'Last activity',
    cell: ({ row }) => <div>{row.getValue('lastActivity')}</div>
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

export const headerClasses = {
  email: 'hidden md:table-cell',
  interviews: 'hidden lg:table-cell',
  lastActivity: 'hidden sm:table-cell'
}

export const cellClasses = {
  email: 'hidden md:table-cell',
  interviews: 'hidden lg:table-cell',
  lastActivity: 'hidden sm:table-cell'
}
