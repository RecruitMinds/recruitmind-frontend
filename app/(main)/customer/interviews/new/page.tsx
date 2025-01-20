'use client'

import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Timer } from 'lucide-react'
import * as z from 'zod'

import { useCreateInterview } from '@/data/hooks/use-interview'
import { CreateInterview } from '@/data/types/interview'
import {
  InterviewStatus,
  SkillLevel,
  WorkArrangements
} from '@/data/types/enums'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import LocationSelector from '@/components/ui/location-input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

const formSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Job role is required'),
    work_arrangment: z.enum(['remote', 'onsite', 'hybrid'], {
      required_error: 'Work arrangement is required'
    }),
    location: z.string().min(1, 'Location is required'),
    description: z.string().min(1, 'Description is required'),
    includeTechnicalAssessment: z.boolean().default(false),
    skillLevel: z.enum(['easy', 'medium', 'hard']).optional(),
    status: z.enum(['active', 'inactive', 'archived'])
  })
  .refine(
    data =>
      !data.includeTechnicalAssessment ||
      (data.includeTechnicalAssessment && data.skillLevel),
    {
      message: 'Difficulty is required when technical assessment is included',
      path: ['skillLevel']
    }
  )

const CreateInterviewPage = () => {
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement>(null)
  const [isNameEditing, setIsNameEditing] = useState(false)
  const [countryName, setCountryName] = useState<string>('')
  const [isNameManuallyEdited, setIsNameManuallyEdited] = useState(false)
  const createInterview = useCreateInterview()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: 'Untitled interview',
      role: '',
      work_arrangment: undefined,
      location: '',
      description: '',
      includeTechnicalAssessment: false,
      skillLevel: undefined,
      status: 'active'
    }
  })

  const generateInterviewName = (
    role: string,
    location: string,
    arrangement: string
  ) => {
    if (role || location || arrangement) {
      const parts = [
        role || 'Untitled',
        location || '',
        arrangement || ''
      ].filter(Boolean)
      return parts.join(' - ')
    }
    return 'Untitled interview'
  }

  useEffect(() => {
    if (!isNameManuallyEdited) {
      const role = form.watch('role')
      const location = countryName
      const arrangement = form.watch('work_arrangment')
      const generatedName = generateInterviewName(role, location, arrangement)
      form.setValue('name', generatedName)
    }
  }, [
    form.watch('role'),
    countryName,
    form.watch('work_arrangment'),
    isNameManuallyEdited
  ])

  const enableNameEditing = () => {
    setIsNameEditing(true)
    setIsNameManuallyEdited(true)
    setTimeout(() => {
      nameRef.current?.focus()
      nameRef.current?.select()
    })
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const createInterviewData: CreateInterview = {
        name: values.name,
        role: values.role,
        workArrangements: values.work_arrangment as WorkArrangements,
        location: values.location,
        description: values.description,
        includeTechnicalAssessment: values.includeTechnicalAssessment,
        skillLevel: values.skillLevel as SkillLevel | undefined,
        status: values.status as InterviewStatus
      }

      await createInterview.mutateAsync(createInterviewData)
      toast.success('Interview created successfully')
      router.push('/customer/interviews')
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to create interview. Please try again.')
    }
  }

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Top Navbar */}
        <div className='sticky top-0 flex h-20 items-center border-b bg-background px-4 md:px-8'>
          <div className='-mt-1'>
            {isNameEditing ? (
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl
                      ref={nameRef}
                      onBlur={e => {
                        e.preventDefault()
                        setIsNameEditing(false)
                      }}
                    >
                      <input
                        placeholder='Software Engineer - Sri Lanka - Remote'
                        type='text'
                        {...field}
                        className='w-96 text-lg font-medium focus:outline-none focus-visible:ring-0'
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className='flex items-center gap-2'>
                <span className='text-xl text-foreground'>
                  {form.watch('name') || 'Untitled interview'}
                </span>

                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='rounded-full'
                  onClick={enableNameEditing}
                >
                  <Pencil className='size-3.5 stroke-2' />
                </Button>
              </div>
            )}

            <div className='flex items-center gap-5 text-sm leading-tight text-muted-foreground'>
              <div className='flex items-center gap-1.5'>
                <Timer className='size-4 stroke-2' />
                <span>0 mins</span>
              </div>
            </div>
          </div>

          <div className='ml-auto flex items-center gap-4'>
            <Button
              type='button'
              variant='outline'
              size='rounded'
              className='h-10 rounded-full border-accent-foreground px-6 font-normal'
              onClick={e => {
                e.preventDefault()
                router.back()
              }}
            >
              Exit
            </Button>
          </div>
        </div>

        {/* Form fields*/}
        <div className='container space-y-8'>
          <div className='grid grid-cols-12 gap-6 gap-x-12 pb-6'>
            <div className='col-span-6'>
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Role</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Job role'
                        type='text'
                        {...field}
                        className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black'
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-6'>
              <FormField
                control={form.control}
                name='work_arrangment'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Arrangment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black data-[placeholder]:text-muted-foreground'>
                          <SelectValue placeholder='work arrangment' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='remote'>Remote</SelectItem>
                        <SelectItem value='onsite'>On/Site</SelectItem>
                        <SelectItem value='hybrid'>Hybrid</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-12'>
              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job role location</FormLabel>
                    <FormControl>
                      <LocationSelector
                        onCountryChange={country => {
                          setCountryName(country?.name || '')
                          form.setValue(field.name, country?.name || '')
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-12'>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={8}
                        placeholder='Job description'
                        className='w-full resize-none rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-12'>
              <FormField
                control={form.control}
                name='includeTechnicalAssessment'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel>Technical Assesment</FormLabel>
                      <FormDescription>
                        Whether the technical assesment is include
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-12'>
              {form.watch('includeTechnicalAssessment') && (
                <FormField
                  control={form.control}
                  name='skillLevel'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black data-[placeholder]:text-muted-foreground'>
                            <SelectValue placeholder='difficulty' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='easy'>Easy</SelectItem>
                          <SelectItem value='medium'>Medium</SelectItem>
                          <SelectItem value='hard'>Hard</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className='col-span-12 place-self-end'>
              <Button
                type='submit'
                disabled={createInterview.isPending}
                size={'rounded'}
              >
                {createInterview.isPending ? 'Creating...' : 'Create Interview'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CreateInterviewPage
