'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import CandidateProfile from './candidate-profile'
import InterviewInvite from './interview-invite'

interface CandidateHeaderProps {
  candidateId: string
  currentIndex?: number
  totalInterviews?: number
  onPreviousClick?: () => void
  onNextClick?: () => void
}

const CandidateHeader = ({
  candidateId,
  currentIndex,
  totalInterviews,
  onPreviousClick,
  onNextClick
}: CandidateHeaderProps) => {
  const router = useRouter()
  const pathName = usePathname()
  const isPaginationNeed = pathName.includes(
    `/customer/candidates/${candidateId}`
  )

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

        {isPaginationNeed && (
          <div className='ml-8 flex items-center gap-1'>
            <Button
              variant={'ghost'}
              size={'icon'}
              disabled={currentIndex === 0}
              onClick={onPreviousClick}
            >
              <ChevronLeft className='size-8' />
            </Button>
            {currentIndex! + 1} / {totalInterviews}
            <Button
              variant={'ghost'}
              size={'icon'}
              disabled={currentIndex === totalInterviews! - 1}
              onClick={onNextClick}
            >
              <ChevronRight className='size-8' />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidateHeader
