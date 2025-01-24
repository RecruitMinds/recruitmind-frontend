'use client'

import { use, useMemo, useState } from 'react'

import { useCandidate } from '@/data/hooks/use-candidate'
import {
  useInvitableInterviews,
  useCandidateInterviewDetails
} from '@/data/hooks/use-interview'

import Loading from '@/components/loading'
import CandidateHeader from '@/components/candidates/candidate-header'
import InterviewCard from '@/components/candidates/interview-card'

const CandidatePage = ({
  params
}: {
  params: Promise<{ candidateId: string }>
}) => {
  const { candidateId } = use(params)
  const { data, isLoading: isCandidateLoading } = useCandidate(candidateId)
  const { isLoading: isInterviewsLoading } = useInvitableInterviews(candidateId)
  const [currentInterviewIndex, setCurrentInterviewIndex] = useState(0)

  const currentInterviewId = useMemo(
    () => data?.interviews?.[currentInterviewIndex],
    [data?.interviews, currentInterviewIndex]
  )

  const { isLoading: isCandiateInteviewLoading } = useCandidateInterviewDetails(
    candidateId,
    currentInterviewId || '',
    {
      enabled: Boolean(currentInterviewId)
    }
  )

  if (isCandidateLoading || isInterviewsLoading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col gap-11 pb-12 pt-[60px]'>
      <CandidateHeader
        candidateId={candidateId}
        currentIndex={currentInterviewIndex}
        totalInterviews={data?.interviews.length || 0}
        onPreviousClick={() =>
          setCurrentInterviewIndex(prev => Math.max(0, prev - 1))
        }
        onNextClick={() =>
          setCurrentInterviewIndex(prev =>
            Math.min((data?.interviews_count || 1) - 1, prev + 1)
          )
        }
      />

      <div className='container'>
        {isCandiateInteviewLoading ? (
          <Loading />
        ) : (
          <InterviewCard
            interviewId={currentInterviewId || ''}
            candidateId={candidateId}
          />
        )}
      </div>
    </div>
  )
}

export default CandidatePage
