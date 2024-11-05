'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

const interviews = [
  {
    value: 'frontend-developer-remote',
    label: 'Frontend Developer - Remote'
  },
  {
    value: '.net-developer-sri-lanka-remote',
    label: '.NET Developer - Sri Lanka - Remote'
  },
  {
    value: 'full-stack-engineer-uk-remote',
    label: 'Full Stack Engineer - UK Remote'
  }
]

const InterviewInvite = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className='ml-auto flex items-center gap-10'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='h-12 w-60 justify-between rounded-[10px] border-muted-foreground bg-background text-xs focus-visible:ring-2 focus-visible:ring-black'
          >
            <span className='w-full truncate text-start'>
              {value
                ? interviews.find(interview => interview.value === value)?.label
                : 'Invite for an interview'}
            </span>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-60 p-0'>
          <Command>
            <CommandInput placeholder='Search interview...' />
            <CommandList>
              <CommandEmpty>No interview found.</CommandEmpty>
              <CommandGroup>
                {interviews.map(interview => (
                  <CommandItem
                    key={interview.value}
                    value={interview.value}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                    className='min-h-12 rounded-none'
                  >
                    {interview.label}
                    <Check
                      className={cn(
                        'ml-auto size-4',
                        value === interview.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        size='rounded'
        disabled={!value}
        className={`${value ? '' : 'bg-accent text-accent-foreground'}`}
      >
        Invite
      </Button>
    </div>
  )
}

export default InterviewInvite
