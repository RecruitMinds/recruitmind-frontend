'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { completeOnboarding } from './_actions'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import LocationSelector from '@/components/ui/location-input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
  companyName: z
    .string()
    .min(1, 'Please enter a company name')
    .max(50, 'Company name must be less than 50 characters'),
  companySize: z.string().min(1, 'Please select company size'),
  location: z.string().min(1, 'Please enter a location'),
  website: z
    .string()
    .trim()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal(''))
})

export type OnboardingFormSchema = z.infer<typeof formSchema>

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()

  const form = useForm<OnboardingFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      companySize: '',
      location: '',
      website: ''
    }
  })

  const onSubmit = async (data: OnboardingFormSchema) => {
    try {
      toast.promise(completeOnboarding(data), {
        loading: 'Setting up your company profile...',
        success: async () => {
          await user?.reload()

          router.push('/customer/interviews')
          return 'Company profile created successfully'
        },
        error: 'Failed to create company profile'
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className='w-full max-w-[600px] rounded-[10px] p-8'>
      <CardHeader className='space-y-0'>
        <CardTitle className='mb-6 text-2xl font-bold'>RecruitMind</CardTitle>

        <h1 className='text-xl font-bold text-gray-900'>
          Share your company details
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          We'll know how to best meet your needs
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='companyName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company name<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Company name'
                      type='text'
                      className='h-12 w-full rounded-[10px] bg-background text-sm focus-visible:ring-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='companySize'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company size<span className='text-red-500'>*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='h-12 w-full rounded-[10px] bg-background text-sm focus-visible:ring-black data-[placeholder]:text-muted-foreground'>
                        <SelectValue placeholder='Select company size' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='1-10'>1-10 employees</SelectItem>
                      <SelectItem value='11-50'>11-50 employees</SelectItem>
                      <SelectItem value='51-200'>51-200 employees</SelectItem>
                      <SelectItem value='201-500'>201-500 employees</SelectItem>
                      <SelectItem value='501-1000'>
                        501-1000 employees
                      </SelectItem>
                      <SelectItem value='1001+'>1001+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className='text-xs text-red-500' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Location<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <LocationSelector
                      onCountryChange={country => {
                        field.onChange(country?.name || '')
                      }}
                      className='rounded-[10px] border-input font-normal'
                      placeholder='Select location'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='https://your-company.com'
                      type='text'
                      className='h-12 w-full rounded-[10px] bg-background text-sm focus-visible:ring-black'
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-500' />
                </FormItem>
              )}
            />

            <Button
              size='rounded'
              type='submit'
              className='!mt-8 w-full disabled:bg-muted-foreground/40 disabled:text-foreground'
              disabled={
                !form.watch('companyName') ||
                !form.watch('companySize') ||
                !form.watch('location') ||
                form.formState.isSubmitting
              }
            >
              {form.formState.isSubmitting ? 'Setting up...' : 'Finish'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
