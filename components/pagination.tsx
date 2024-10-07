import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

const Pagination = () => {
  return (
    <div className='flex h-16 w-full items-center justify-end border-t pr-6 text-foreground/80'>
      <div className='ml-auto flex items-center gap-7'>
        <div className='flex items-center space-x-2'>
          <span className='text-sm'>Items per page</span>
          <select className='rounded border px-2 py-1 text-sm'>
            <option>25</option>
          </select>
        </div>
        <div className='text-sm'>1 - 1 of 1</div>
        <div className='flex items-center space-x-1'>
          <Button variant='ghost' size='icon' className='size-8' disabled>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' className='size-8' disabled>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
