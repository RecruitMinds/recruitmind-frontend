'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import CandidateProfile from './candidate-profile'
import InterviewInvite from './interview-invite'

interface CandidateHeaderProps {
  candidateId: string
}

const CandidateHeader = ({ candidateId }: CandidateHeaderProps) => {
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
        <CandidateProfile candidateId={candidateId} />

        {/* Invite interview */}
        <InterviewInvite candidateId={candidateId} />
      </div>
    </div>
  )
}

export default CandidateHeader
