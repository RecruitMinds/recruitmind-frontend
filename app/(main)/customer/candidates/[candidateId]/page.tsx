'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Banknote,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronsUpDown,
  Copy,
  IdCard,
  MapPin
} from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

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

const CandidatePage = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className='flex flex-col gap-11 pb-12 pt-[60px]'>
      <div className='flex h-20 items-center border-b bg-background'>
        <div className='container flex items-center'>
          <Button
            variant='outline'
            size='rounded'
            className='mr-8 border-accent-foreground px-3.5'
            onClick={() => router.back()}
          >
            <ChevronLeft className='size-4 stroke-2' />
          </Button>

          {/* Profile details */}
          <div className='flex items-center gap-10'>
            <div className='flex items-center gap-3'>
              <Avatar className='size-12'>
                <AvatarFallback className='bg-secondary text-xl text-foreground'>
                  HK
                </AvatarFallback>
              </Avatar>
              <div className='leading-tight tracking-tight'>
                <h2 className='text-xl font-bold text-foreground'>
                  hasith kovinda (He/Him)
                </h2>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <span>hasith300@gmail.com</span>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='ml-1 size-4 text-foreground'
                  >
                    <Copy className='size-3' />
                  </Button>
                </div>
              </div>
            </div>

            {/* Work details */}
            <div className='flex flex-col gap-2 text-sm leading-tight tracking-tight'>
              <div className='flex items-center'>
                <div className='flex items-center gap-1.5'>
                  <Briefcase className='size-4 stroke-2' />
                  <span className='font-bold'>4 yrs of exp</span>
                </div>
                <span className='mx-2.5'>•</span>
                <div className='flex items-center gap-1.5'>
                  <IdCard className='size-4 stroke-2' />
                  <span>.NET Developer</span>
                </div>
              </div>

              <div className='flex items-center'>
                <div className='flex items-center gap-1.5'>
                  <MapPin className='size-4 stroke-2' />
                  <span>Sri Lanka</span>
                </div>
                <span className='mx-2.5'>•</span>
                <div className='flex items-center gap-1.5'>
                  <Banknote className='size-4 stroke-2' />
                  <span>USD 1,000/yr</span>
                </div>
              </div>
            </div>

            <Button
              variant='outline'
              size='rounded'
              className='border-accent-foreground font-normal leading-tight tracking-tight'
            >
              View profile
            </Button>
          </div>

          {/* Invite interview */}
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
                      ? interviews.find(interview => interview.value === value)
                          ?.label
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
                              value === interview.value
                                ? 'opacity-100'
                                : 'opacity-0'
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
        </div>
      </div>

      <div className='container'>
        <Card className='w-full rounded-[10px] shadow-sm'>
          <CardHeader className='p-10'>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent className='p-10'></CardContent>
          <CardFooter className='flex justify-between p-10'>
            <Button variant='outline'>Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default CandidatePage
