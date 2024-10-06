import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import InterviewsTable from './interviews-table'
import FilterTabs from './filter-tabs'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/searchbar'

const InterviewsPage = () => {
  return (
    <div className='mt-16 pb-24'>
      <div className='container flex flex-col gap-10'>
        <div className='mt-10 flex items-center justify-between'>
          <h1 className='text-3xl font-bold leading-8'>Interviews</h1>

          <Button size={'rounded'} className='gap-x-2'>
            <Plus />
            Create interview
          </Button>
        </div>

        <div className='flex flex-col items-center justify-between gap-5 md:flex-row md:gap-8 lg:gap-0'>
          <SearchBar className='md:max-w-[460px]' placeholder='Search' />
          <FilterTabs />
        </div>

        <div className='-mt-3 w-full overflow-hidden rounded-[10px] border bg-white md:mt-0'>
          <InterviewsTable />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default InterviewsPage
