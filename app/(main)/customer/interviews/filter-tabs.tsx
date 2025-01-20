import { InterviewStatus } from '@/data/types/enums'
import { cn } from '@/lib/utils'

interface FilterTabsProps {
  activeStatus: InterviewStatus
  onStatusChange: (status: InterviewStatus) => void
}

const FilterTabs = ({ activeStatus, onStatusChange }: FilterTabsProps) => {
  const tabs = [
    { label: 'Active', value: InterviewStatus.ACTIVE },
    { label: 'Inactive', value: InterviewStatus.INACTIVE },
    { label: 'Archived', value: InterviewStatus.ARCHIVED }
  ]

  return (
    <div className='flex h-12 w-full divide-x-[1px] divide-muted-foreground overflow-hidden rounded-[10px] border border-muted-foreground md:w-[394px]'>
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onStatusChange(tab.value)}
          className={cn(
            'w-full text-sm transition-all',
            activeStatus === tab.value
              ? 'bg-primary/20 font-bold'
              : 'bg-white text-muted-foreground'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default FilterTabs
