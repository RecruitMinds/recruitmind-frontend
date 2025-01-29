'use client'

import { Building2 } from 'lucide-react'
import { UserProfile, useUser } from '@clerk/nextjs'

import CompanyPage from './company'
import Loading from '@/components/loading'

const ProfilePage = () => {
  const { isLoaded } = useUser()

  if (!isLoaded) {
    return <Loading />
  }

  return (
    <div className='mt-16 pb-24'>
      <div className='container flex flex-col'>
        <div className='mt-10 w-full'>
          <UserProfile
            path='/profile'
            routing='path'
            appearance={{
              variables: {
                fontSize: '0.875rem'
              },
              elements: {
                rootBox: 'w-full',
                cardBox:
                  'w-full md:flex md:flex-col shadow-none rounded-2xl border bg-white',
                scrollBox: 'md:rounded-t-none',
                navbar:
                  'max-w-full w-full md:block md:flex-none md:p-0 md:pl-8 bg-none',
                navbarButtons: 'md:flex md:flex-row',
                navbarButton:
                  'md:px-10 py-5 rounded-none md:hover:border-b-2 text-foreground data-[active=true]:bg-primary/10 md:data-[active=true]:border-b-2 data-[active=true]:border-primary',
                footer: 'hidden'
              }
            }}
          >
            <UserProfile.Page label='account' />

            <UserProfile.Page
              label='Company'
              labelIcon={<Building2 className='size-4' />}
              url='company'
            >
              <CompanyPage />
            </UserProfile.Page>

            <UserProfile.Page label='security' />
          </UserProfile>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
