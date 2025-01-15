import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useInterviewList } from '@/data/hooks/use-interview'
import { X } from 'lucide-react'

interface FilterOptionsProps {
  setInterviewFilter: (interviewId: string) => void
}

const FilterOptions = ({ setInterviewFilter }: FilterOptionsProps) => {
  const { data: interviews, isLoading } = useInterviewList()

  return (
    <div className='flex w-full items-center gap-x-3 md:w-auto'>
      <Select disabled={isLoading} onValueChange={setInterviewFilter}>
        <SelectTrigger className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-xs focus-visible:ring-black md:w-64'>
          <SelectValue placeholder={isLoading ? 'Loading...' : 'Interviews'} />
        </SelectTrigger>
        <SelectContent className='w-full md:w-64'>
          {interviews?.map(interview => (
            <SelectItem
              key={interview._id}
              value={interview._id}
              className='h-12 rounded-none'
            >
              {interview.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* TODO: Implement Job role based filtering */}
      <Select>
        <SelectTrigger className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-xs focus-visible:ring-black md:w-56'>
          <SelectValue placeholder='Job role' />
        </SelectTrigger>
        <SelectContent className='w-full md:w-56'>
          <SelectItem value='.net' className='h-12 rounded-none'>
            .NET Developer
          </SelectItem>
          <SelectItem value='java' className='h-12 rounded-none'>
            Java Developer
          </SelectItem>
          <SelectItem value='javascript' className='h-12 rounded-none'>
            JavaScript Developer
          </SelectItem>
          <SelectItem value='python' className='h-12 rounded-none'>
            Python Developer
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default FilterOptions
