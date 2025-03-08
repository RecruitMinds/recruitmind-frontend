'use client'

import { Download, HelpCircle, Mail, UserX } from 'lucide-react'

import { cn } from '@/lib/utils'
import { CandidateInterviewStatus } from '@/data/types/enums'
import { useCandidateInterviewDetails } from '@/data/hooks/use-interview'

import StarRating from '../star-rating'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'

interface InterviewHeaderProps {
  interviewId: string
  candidateId: string
}

const InterviewHeader = ({
  interviewId,
  candidateId
}: InterviewHeaderProps) => {
  const { data } = useCandidateInterviewDetails(candidateId, interviewId, {
    staleTime: Infinity,
    enabled: false
  })

  const isInterviewCompleted =
    data?.status === CandidateInterviewStatus.COMPLETED

  return (
    <CardTitle className='flex items-center justify-between'>
      <div className='flex flex-col items-start gap-2'>
        <div className='flex items-center gap-5 text-xl'>
          <strong>Interview</strong>
          <span className='font-normal'>{data?.name || 'Interview Name'}</span>
        </div>

        <StarRating
          initialRating={data?.rating ?? 0}
          totalStars={5}
          readOnly={true}
        />
      </div>

      {isInterviewCompleted && (
        <div className='flex items-center gap-2'>
          {[HelpCircle, Download, Mail, UserX].map((Icon, i) => (
            <Button
              key={i}
              variant='outline'
              size='rounded'
              className='group/icon border-accent-foreground px-3.5'
            >
              <Icon
                className={cn(
                  'size-5 stroke-2',
                  (i == 0 || i == 2) &&
                    'group-hover/icon:fill-current group-hover/icon:stroke-white',
                  i == 3 && 'group-hover/icon:fill-current'
                )}
              />
            </Button>
          ))}
        </div>
      )}
    </CardTitle>
  )
}

export default InterviewHeader
