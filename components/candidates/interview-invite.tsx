'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import type { InterviewList } from '@/data/types/interview'
import {
  useInvitableInterviews,
  useInviteExistingCandidate
} from '@/data/hooks/use-interview'

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

interface InterviewInviteProps {
  candidateId: string
}

const InterviewInvite = ({ candidateId }: InterviewInviteProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const { data: interviews, isLoading } = useInvitableInterviews(candidateId, {
    staleTime: Infinity,
    enable: false
  })
  const { mutateAsync, isPending } = useInviteExistingCandidate()

  const selectedInterview = interviews?.find(
    interview => interview._id === value
  )

  const inviteInterview = async () => {
    if (!value) return

    await toast.promise(
      mutateAsync({
        interview: value,
        candidate: candidateId
      }),
      {
        loading: 'Sending interview invitation...',
        success: 'Interview invitation sent successfully!',
        error: 'Failed to send interview invitation'
      }
    )
  }

  return (
    <div className='ml-auto flex items-center gap-10'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            disabled={isLoading}
            aria-expanded={open}
            className='h-12 w-60 justify-between rounded-[10px] border-muted-foreground bg-background text-xs focus-visible:ring-2 focus-visible:ring-black'
          >
            {isLoading ? (
              <span>Loading interviews...</span>
            ) : (
              <span className='w-full truncate text-start'>
                {selectedInterview?.name || 'Invite for an interview'}
              </span>
            )}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-60 p-0'>
          <Command>
            <CommandInput placeholder='Search interview...' />
            <CommandList>
              <CommandEmpty>No interview found.</CommandEmpty>
              <CommandGroup>
                {interviews?.map((interview: InterviewList) => (
                  <CommandItem
                    key={interview._id}
                    value={interview._id}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                    className='min-h-12 rounded-none'
                  >
                    {interview.name}
                    <Check
                      className={cn(
                        'ml-auto size-4',
                        value === interview._id ? 'opacity-100' : 'opacity-0'
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
        disabled={isLoading || !value || isPending}
        onClick={inviteInterview}
        className={cn(
          value
            ? 'bg-primary text-primary-foreground'
            : 'bg-accent text-accent-foreground'
        )}
      >
        Invite
      </Button>
    </div>
  )
}

export default InterviewInvite
