import { HiringStage } from '@/data/types/enums'
import { formatSnakeCase } from '@/lib/utils'
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
}

const HiringStageSelect = ({
  value,
  onValueChange,
  disabled = false,
  loading = false
}: HiringStageSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || loading}
    >
      <SelectTrigger
        className={`h-8 w-[180px] rounded-[10px] border-muted-foreground/60 pr-1.5 focus:ring-foreground ${
          loading ? 'opacity-50' : ''
        }`}
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
