import * as z from 'zod'

export const inviteFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Email is required' })
})

export type InviteFormValues = z.infer<typeof inviteFormSchema>
