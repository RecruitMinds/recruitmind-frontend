'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { OnboardingFormSchema } from './page'

export const completeOnboarding = async (data: OnboardingFormSchema) => {
  const { userId } = await auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        companyName: data.companyName,
        companySize: data.companySize,
        location: data.location,
        website: data.website
      }
    })
    return { message: res.publicMetadata }
  } catch {
    return { error: 'There was an error updating the user metadata.' }
  }
}
