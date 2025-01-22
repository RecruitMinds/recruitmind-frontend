import { HiringStage } from '@/data/types/enums'
import { cn, formatSnakeCase } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface HiringStageSelectProps {
  value: HiringStage
  onValueChange: (value: HiringStage) => void
  disabled?: boolean
  loading?: boolean
  className?: React.ComponentProps<'div'>['className']
}

const HiringStageSelect = ({
  value,
  onValueChange,
  disabled = false,
  loading = false,
  className
}: HiringStageSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || loading}
    >
      <SelectTrigger
        className={cn(
          'h-8 w-[180px] rounded-[10px] border-muted-foreground/60 pr-1.5 focus:ring-foreground',
          loading ? 'opacity-50' : '',
          className
        )}
      >
        <SelectValue defaultValue={value} />
      </SelectTrigger>
      <SelectContent>
        {Object.values(HiringStage).map(stage => (
          <SelectItem key={stage} value={stage} className='rounded-none py-2.5'>
            {formatSnakeCase(stage)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default HiringStageSelect
