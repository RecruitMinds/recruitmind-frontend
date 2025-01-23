'use client'

import { use } from 'react'

import { useCandidate } from '@/data/hooks/use-candidate'
import { useInvitableInterviews } from '@/data/hooks/use-interview'

import Loading from '@/components/loading'
import CandidateHeader from '@/components/candidates/candidate-header'
import InterviewCard from '@/components/candidates/interview-card'

const CandidateResultPage = ({
  params
}: {
  params: Promise<{ candidateId: string; interviewId: string }>
}) => {
  const { candidateId, interviewId } = use(params)
  const { isLoading: isCandidateLoading } = useCandidate(candidateId)
  const { isLoading: isInterviewsLoading } = useInvitableInterviews(candidateId)

  if (isCandidateLoading || isInterviewsLoading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col gap-11 pb-12 pt-[60px]'>
      <CandidateHeader candidateId={candidateId} />

      <div className='container'>
        <InterviewCard interviewId={interviewId} candidateId={candidateId} />
      </div>
    </div>
  )
}

export default CandidateResultPage
