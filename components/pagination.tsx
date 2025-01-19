import { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface PaginationProps<TData> {
  table: Table<TData>
  totalItems?: number
}

const Pagination = <TData,>({ table, totalItems }: PaginationProps<TData>) => {
  const { pageSize, pageIndex } = table.getState().pagination

  return (
    <div className='flex h-16 w-full items-center justify-end border-t pr-6 text-foreground/90'>
      <div className='ml-auto flex items-center gap-7'>
        <div className='flex items-center space-x-2'>
          <span className='text-sm'>Items per page</span>
          <select
            value={pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='rounded-sm border px-2 py-1.5 text-sm'
          >
            {[10, 25, 50].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className='text-sm'>
          {' '}
          {`${pageIndex * pageSize + 1} - ${Math.min(
            (pageIndex + 1) * pageSize,
            totalItems || 0
          )} of ${totalItems || 0}`}
        </div>
        <div className='flex items-center space-x-1'>
          <Button
            variant='ghost'
            size='icon'
            className='size-8'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='size-8'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
