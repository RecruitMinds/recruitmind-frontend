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
  Download,
  Globe,
  HelpCircle,
  IdCard,
  Mail,
  MapPin,
  Maximize,
  MonitorSmartphone,
  Mouse,
  Star,
  UserX,
  Video
} from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
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
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Textarea } from '@/components/ui/textarea'
import StarRating from '@/components/star-rating'

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

const evaluationCriteria = [
  {
    name: 'Core JavaScript Knowledge',
    score: 58,
    description:
      "Assesses the candidate's understanding of fundamental JavaScript concepts such as variables, data types, functions, closures, and the event loop.",
    subCriteria: [
      'Variables and scoping',
      'Data types and coercion',
      'Functions and closures',
      'Prototypes and inheritance',
      'Asynchronous JavaScript (Promises, async/await)'
    ]
  },
  {
    name: 'Problem-Solving Skills',
    score: 17,
    description:
      "Evaluates the candidate's ability to solve algorithmic problems, optimize code, and handle edge cases using JavaScript.",
    subCriteria: [
      'Algorithm implementation',
      'Code optimization',
      'Debugging skills',
      'Edge case handling',
      'Time and space complexity analysis'
    ]
  },
  {
    name: 'Modern JavaScript Ecosystem',
    score: 17,
    description:
      "Measures the candidate's familiarity with modern JavaScript tools, frameworks, and best practices.",
    subCriteria: [
      'ES6+ features',
      'Node.js and npm',
      'Babel and webpack',
      'React, Vue, or Angular knowledge',
      'Testing frameworks (Jest, Mocha)'
    ]
  },
  {
    name: 'Code Quality and Best Practices',
    score: 20,
    description:
      "Assesses the candidate's ability to write clean, maintainable, and efficient JavaScript code.",
    subCriteria: [
      'Code readability and organization',
      'Proper error handling',
      'Performance considerations',
      'Security best practices',
      'Documentation and comments'
    ]
  },
  {
    name: 'Soft Skills and Collaboration',
    score: 12,
    description:
      "Evaluates the candidate's communication skills, ability to explain technical concepts, and potential for team collaboration.",
    subCriteria: [
      'Clear communication of ideas',
      'Ability to explain complex concepts',
      'Receptiveness to feedback',
      'Problem-solving approach',
      'Team collaboration potential'
    ]
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
            <CardTitle className='flex items-center justify-between'>
              <div className='flex flex-col items-start gap-2'>
                <div className='flex items-center gap-5 text-xl'>
                  <strong>Interview</strong>
                  <span className='font-normal'>
                    .NET Developer - Sri Lanka - Remote
                  </span>
                </div>
                <div className='flex items-center'>
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className='size-5 fill-current text-primary'
                    />
                  ))}
                  <Star className='size-5 fill-current text-input' />
                </div>
              </div>

              <div className='flex items-center gap-2'>
                {[HelpCircle, Download, Mail, UserX].map((Icon, i) => (
                  <Button
                    key={i}
                    variant='outline'
                    size='rounded'
                    className='group/icon border-accent-foreground px-3.5'
                  >
                    <Icon
                      className={cn(
                        'size-5 stroke-2',
                        (i == 0 || i == 2) &&
                          'group-hover/icon:fill-current group-hover/icon:stroke-white',
                        i == 3 && 'group-hover/icon:fill-current'
                      )}
                    />
                  </Button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className='px-10'>
            <div className='grid grid-cols-5 gap-2'>
              <div className='col-span-1 pr-5'>
                <dl className='space-y-8 text-sm leading-5'>
                  <div className='space-y-3'>
                    <dt className='font-bold text-gray-900'>Invited</dt>
                    <dd className='text-accent-foreground'>
                      September 30th, 2024
                    </dd>
                  </div>
                  <div className='space-y-3'>
                    <dt className='font-bold text-gray-900'>Completed</dt>
                    <dd className='text-accent-foreground'>
                      September 30th, 2024
                    </dd>
                  </div>
                  <div className='space-y-3'>
                    <dt className='font-bold text-gray-900'>
                      Extra time breakdown
                    </dt>
                    <dd className='text-accent-foreground'>
                      No extra time was granted to this candidate
                    </dd>
                  </div>
                  <div className='space-y-3'>
                    <dt className='font-bold text-gray-900'>Source</dt>
                    <dd className='text-accent-foreground'>
                      Invitation by email
                    </dd>
                  </div>
                  <div className='space-y-3'>
                    <dt className='font-bold text-gray-900'>Hiring stage</dt>
                    <dd className='text-accent-foreground'>
                      No extra time was granted to this candidate
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='col-span-4 grid grid-cols-2 gap-6'>
                <div className='col-span-1'>
                  {/* Candidate score card */}
                  <div className='rounded-lg border p-4 pt-7 shadow-sm'>
                    <div className='mb-5 flex items-center gap-11'>
                      <div className='relative h-4 w-full'>
                        <Progress
                          value={31}
                          max={100}
                          className='relative h-4 w-full'
                        />
                        <div className='absolute inset-0 flex items-center justify-between text-xs'>
                          <span className='px-2 text-white'>0%</span>
                          <span className='px-2 text-black'>100%</span>
                        </div>

                        {/* Best candidate marker */}
                        <div className='absolute -top-3 h-5 w-[31%] border-r-2 border-black' />
                        <div
                          className='absolute -top-9 -translate-x-1/2 transform rounded-full border border-dashed border-black px-2 py-0.5 text-xs font-bold text-gray-500'
                          style={{ left: `${31}%` }}
                        >
                          {31}%
                        </div>

                        {/* Candidate average marker */}
                        <div className='absolute -bottom-3 h-3 w-[62%] border-r-2 border-black' />
                        <div
                          className='absolute -bottom-9 -translate-x-1/2 transform rounded-full border border-muted-foreground px-2 py-0.5 text-xs font-bold text-gray-500'
                          style={{ left: `${62}%` }}
                        >
                          {62}%
                        </div>
                      </div>

                      <div className='flex flex-col font-bold tracking-tight'>
                        <span className='text-[40px] leading-[50px]'>31%</span>
                        <span className='text-xs'>Average score</span>
                      </div>
                    </div>

                    <div className='flex items-center gap-2 text-xs leading-4 tracking-tighter'>
                      <strong>This interview:</strong>
                      <span className='flex items-center gap-1 text-[10px] text-muted-foreground'>
                        <div className='h-2.5 w-4 rounded-full border border-muted-foreground' />
                        Your candidate pool average
                      </span>
                      <span className='flex items-center gap-1 text-[10px] text-muted-foreground'>
                        <div className='h-2.5 w-4 rounded-full border border-dashed border-muted-foreground' />
                        Your best candidate score
                      </span>
                    </div>

                    <p className='mt-4 cursor-pointer text-sm font-medium text-primary underline'>
                      How to interpret results
                    </p>
                  </div>

                  {/* Interview evaluation criteria */}
                  <div className='mt-6 rounded-lg bg-secondary p-6'>
                    <div className='mb-4 flex flex-col tracking-normal'>
                      <span className='text-xs leading-relaxed'>
                        Evaluation method
                      </span>
                      <h3 className='text-sm font-bold leading-relaxed'>
                        Interview evaluation criteria
                      </h3>
                    </div>

                    <span className='text-xs font-bold leading-[48px]'>
                      Criteria included in evaluation
                    </span>

                    <Accordion type='single' collapsible className='space-y-3'>
                      {evaluationCriteria.map((criteria, i) => (
                        <AccordionItem
                          key={i}
                          value={criteria.name}
                          className='rounded-[8px] border bg-white pl-3 pr-6 shadow-sm'
                        >
                          <AccordionTrigger className='h-11 flex-row-reverse'>
                            <div className='flex w-full items-center justify-between pl-2 text-sm font-normal'>
                              <span>{criteria.name}</span>
                              <span>{criteria.score}%</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className='px-6'>
                            <Separator className='mb-2' />
                            {criteria.description}
                            <Separator className='my-2 mb-4' />
                            <ul className='mt-3 list-disc pl-5'>
                              {criteria.subCriteria.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                            <Separator className='my-2 mt-4' />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>

                <div className='col-span-1'>
                  <div className='mb-3 flex items-center justify-between py-2.5 text-sm'>
                    <h3 className='font-bold'>Anti-cheating monitor</h3>
                    <span className='cursor-pointer font-medium text-primary underline'>
                      Learn more
                    </span>
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <div className='flex items-center justify-between text-sm'>
                      <div className='flex items-center gap-2 text-foreground'>
                        <MonitorSmartphone className='size-4' />
                        <span>Device used</span>
                      </div>
                      <span className='font-bold'>Desktop</span>
                    </div>

                    <div className='flex items-center justify-between text-sm'>
                      <div className='flex items-center gap-2 text-foreground'>
                        <MapPin className='size-4' />
                        <span>Location</span>
                      </div>
                      <span className='font-bold'>Colombo (1), LK</span>
                    </div>
                    <Separator className='my-2.5' />
                  </div>

                  <div className='mb-7 space-y-1.5 text-sm text-foreground'>
                    {[
                      {
                        label: 'Filled out only once from IP address?',
                        Icon: Globe,
                        value: 'Yes'
                      },
                      { label: 'Webcam enabled?', Icon: Video, value: 'Yes' },
                      {
                        label: 'Full-screen mode always active?',
                        Icon: Maximize,
                        value: 'No'
                      },
                      {
                        label: 'Mouse always in assessment window?',
                        Icon: Mouse,
                        value: 'Yes'
                      }
                    ].map(({ label, Icon, value }, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between text-sm'
                      >
                        <div className='flex items-center gap-2 text-foreground'>
                          <Icon className='size-4' />
                          <span>{label}</span>
                        </div>
                        <span
                          className={`flex h-6 items-center justify-center rounded-full px-2 text-xs ${value === 'No' ? 'bg-red-300' : 'bg-lime-400'}`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className='relative aspect-video bg-accent'>
                    {/* Placeholder for video player */}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className='mt-3 grid grid-cols-2 border-t p-10'>
            <div className='flex flex-col gap-3 text-sm tracking-tight'>
              <span className='font-bold'>Your rating</span>
              <span className='pr-16'>
                Give your personal overall rating of this candidate based on
                your impressions and interactions with him or her.
              </span>

              <div className='mt-2'>
                <StarRating totalStars={5} />
              </div>
            </div>
            <div className='pl-3'>
              <Textarea
                placeholder='Add your private notes here (auto-saved)...'
                rows={4}
                className='mt-2 rounded-[10px] border-foreground/40'
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default CandidatePage
