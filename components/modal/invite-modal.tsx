import { useState } from 'react'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useInviteModal } from '@/store/use-invite-modal'
import { inviteFormSchema, InviteFormValues } from '@/lib/schemas'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ScrollArea } from '../ui/scroll-area'

const InviteModal = () => {
  const { isOpen, onClose } = useInviteModal()
  const [candidates, setCandidates] = useState<InviteFormValues[]>([])

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: ''
    }
  })

  const onSubmit = (values: InviteFormValues) => {
    setCandidates([...candidates, values])
    form.reset()
  }

  const onAdd = () => {
    form.handleSubmit(onSubmit)()
  }

  const removeCandidate = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index))
  }

  const clearCandidates = () => {
    setCandidates([])
  }

  const onInvite = () => {
    // Here you would typically send the invites using the candidates array
    // and the email template from the useEmailTemplate store
    // console.log('Sending invites with template:', template)
    console.log('To candidates:', candidates)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>
            Invite candidates
          </DialogTitle>
        </DialogHeader>

        <div className='mt-6'>
          <div className='flex items-center justify-between'>
            <p className='mb-6 text-sm text-foreground'>
              Send an invitation email to candidates.
            </p>

            {candidates.length > 0 && (
              <button
                className='mb-6 pb-0.5 text-sm underline hover:text-muted-foreground'
                onClick={clearCandidates}
              >
                Clear list
              </button>
            )}
          </div>

          <div className='rounded-[10px] border'>
            <div className='flex max-h-[400px] flex-col overflow-hidden'>
              <Table>
                <TableHeader className='sticky top-0 h-14'>
                  <TableRow className='bg-secondary hover:bg-secondary'>
                    <TableHead className='w-[200px] pl-3 text-foreground'>
                      First name
                    </TableHead>
                    <TableHead className='w-[200px] text-foreground'>
                      Last name
                    </TableHead>
                    <TableHead className='text-foreground'>Email</TableHead>
                    <TableHead className='w-[50px]'></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className='overflow-y-auto'>
                  {candidates.map((candidate, index) => (
                    <TableRow key={index} className='h-16 hover:bg-transparent'>
                      <TableCell className='pl-3'>
                        {candidate.firstName}
                      </TableCell>
                      <TableCell>{candidate.lastName}</TableCell>
                      <TableCell>{candidate.email}</TableCell>
                      <TableCell>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-6 w-6 p-0'
                          onClick={() => removeCandidate(index)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter className='sticky bottom-0'>
                  <TableRow className='hover:bg-transparent'>
                    <TableCell colSpan={4} className='p-0'>
                      <Form {...form}>
                        <div className='h-20 bg-white p-3'>
                          <div className='grid grid-cols-[1fr,1fr,1.5fr,auto] gap-4'>
                            <FormField
                              control={form.control}
                              name='firstName'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder='First name'
                                      className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className='!mt-0.5 text-xs' />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name='lastName'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder='Last name'
                                      className='h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className='!mt-0.5 text-xs' />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name='email'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder='Email'
                                      className={`h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black ${form.formState.errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className='!mt-0.5 text-xs' />
                                </FormItem>
                              )}
                            />

                            <Button
                              type='button'
                              variant='outline'
                              size='rounded'
                              className='mt-1 h-10'
                              onClick={onAdd}
                            >
                              <span className='text-lg leading-none'>+</span>
                              Add
                            </Button>
                          </div>
                        </div>
                      </Form>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-3'>
          <Button
            size={'rounded'}
            variant='outline'
            className='font-normal'
            // onClick={() => setCustomizeEmailOpen(true)}
          >
            Customize email
          </Button>
          <Button
            size={'rounded'}
            onClick={onInvite}
            disabled={candidates.length === 0}
          >
            Invite candidate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal
