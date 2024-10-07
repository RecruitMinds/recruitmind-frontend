import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const FilterOptions = () => {
  return (
    <div className='flex w-full items-center gap-x-3 md:w-auto'>
      <Select>
        <SelectTrigger className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-xs focus-visible:ring-black md:w-56'>
          <SelectValue placeholder='Interviews' />
        </SelectTrigger>
        <SelectContent className='w-full md:w-56'>
          <SelectItem value='.net-developer' className='h-12 rounded-none'>
            .NET Developer - Sri Lanka - Remote
          </SelectItem>
          <SelectItem value='frontend-developer' className='h-12 rounded-none'>
            Frontend Developer - Remote
          </SelectItem>
          <SelectItem value='fullstack-developer' className='h-12 rounded-none'>
            Full Stack Engineer - UK Remote
          </SelectItem>
        </SelectContent>
      </Select>

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
