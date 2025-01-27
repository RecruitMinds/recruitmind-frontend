'use client'

import { z } from 'zod'
import Image from 'next/image'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { memo, useCallback, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LocationSelector from '@/components/ui/location-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { useUser } from '@clerk/nextjs'

const formSchema = z.object({
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(50, 'Company name must be less than 50 characters'),
  companyLocation: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(50, 'Location must be less than 50 characters'),
  companyLogo: z.instanceof(File).optional()
})

type FormSchema = z.infer<typeof formSchema>

const CompanyPage = () => {
  const { user } = useUser()
  console.log(user?.publicMetadata.companyName)
  const [preview, setPreview] = useState<string | null>(null)
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: (user?.publicMetadata?.companyName as string) || '',
      companyLocation: (user?.publicMetadata?.location as string) || '',
      companyLogo: undefined
    }
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        setPreview(URL.createObjectURL(file))
        form.setValue('companyLogo', file, {
          shouldValidate: true,
          shouldDirty: true
        })
      }
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    preventDropOnDocument: true,
    onDrop
  })

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file_array = Array.from(e.target.files || [])
    onDrop(file_array)
  }

  const onSubmit = async (data: FormSchema) => {
    try {
      toast.loading('Updating company details...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form data:', data)
      toast.dismiss()
      toast.success('Company details updated successfully')
    } catch (error) {
      console.error('Error updating company details:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update company details'
      )
    }
  }

  return (
    <div>
      <div className='px-4 sm:px-0'>
        <h3 className='text-xl font-semibold text-foreground'>
          Company details
        </h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-4 border-t border-border/80'
        >
          <dl className='divide-y divide-border/80'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm/6 font-medium text-foreground'>
                Company name
              </dt>
              <dd className='mt-1 text-sm/6 sm:col-span-2 sm:mt-0'>
                <FormField
                  control={form.control}
                  name='companyName'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Company name'
                          type='text'
                          className='h-10 w-full max-w-xl rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </dd>
            </div>

            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm/6 font-medium text-foreground'>
                Company location
              </dt>
              <dd className='mt-1 text-sm/6 sm:col-span-2 sm:mt-0'>
                <FormField
                  control={form.control}
                  name='companyLocation'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <LocationSelector
                          className='h-10 max-w-xl'
                          defaultValue={form.getValues('companyLocation')}
                          onCountryChange={country => {
                            field.onChange(country?.name || '')
                          }}
                          placeholder='Company Location'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </dd>
            </div>

            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm/6 font-medium text-foreground'>
                Company logo
              </dt>
              <dd className='mt-1 text-sm/6 sm:col-span-2 sm:mt-0'>
                <FormField
                  control={form.control}
                  name='companyLogo'
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div
                          {...getRootProps()}
                          className={`relative flex aspect-square h-48 cursor-pointer select-none items-center justify-center rounded-lg border-2 ${
                            isDragActive
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:bg-gray-50'
                          } transition-all duration-200`}
                        >
                          <input {...getInputProps({ onChange })} />
                          {preview ? (
                            <Image
                              src={preview}
                              alt='Company logo'
                              fill
                              className='rounded-lg object-cover'
                            />
                          ) : (
                            <div className='absolute inset-0 flex flex-col items-center justify-center gap-2 text-center'>
                              <span className='text-sm font-medium text-gray-600'>
                                Drop your company logo here
                              </span>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </dd>
            </div>
          </dl>

          <div className='flex items-end justify-end'>
            <Button
              type='submit'
              size='rounded'
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default memo(CompanyPage)
