import SearchBar from '@/components/searchbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { formatSnakeCase } from '@/lib/utils'
import { CandidateInterviewStatus, HiringStage } from '@/data/types/candidate'

interface FiltersProps {
  onSearchChange: (value: string) => void
  onStageChange: (value: HiringStage) => void
  onStatusChange: (value: CandidateInterviewStatus) => void
}

const Filters = ({
  onSearchChange,
  onStageChange,
  onStatusChange
}: FiltersProps) => {
  return (
    <div className='flex items-center gap-6'>
      <SearchBar
        placeholder='Search'
        className='text-sm'
        onChange={e => onSearchChange(e.target.value)}
      />

      <Select onValueChange={value => onStageChange(value as HiringStage)}>
        <SelectTrigger className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black md:w-52'>
          <SelectValue placeholder='Stage' />
        </SelectTrigger>
        <SelectContent className='max-h-64 w-full md:w-52'>
          {Object.values(HiringStage).map(stage => (
            <SelectItem key={stage} value={stage} className='h-12 rounded-none'>
              {formatSnakeCase(stage)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={value =>
          onStatusChange(value as CandidateInterviewStatus)
        }
      >
        <SelectTrigger className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black md:w-52'>
          <SelectValue placeholder='Status' />
        </SelectTrigger>
        <SelectContent className='w-full md:w-52'>
          {Object.values(CandidateInterviewStatus).map(status => (
            <SelectItem
              key={status}
              value={status}
              className='h-12 rounded-none'
            >
              {formatSnakeCase(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default Filters
