'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import CandidateProfile from './candidate-profile'
import InterviewInvite from './interview-invite'

const CandidateHeader = () => {
  const router = useRouter()

  return (
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
        <CandidateProfile />

        {/* Invite interview */}
        <InterviewInvite />
      </div>
    </div>
  )
}

export default CandidateHeader
