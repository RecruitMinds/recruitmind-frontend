import { use } from 'react'

import CandidateHeader from '@/components/candidates/candidate-header'
import InterviewCard from '@/components/candidates/interview-card'

const CandidatePage = ({
  params
}: {
  params: Promise<{ candidateId: string }>
}) => {
  const { candidateId } = use(params)

  return (
    <div className='flex flex-col gap-11 pb-12 pt-[60px]'>
      <CandidateHeader candidateId={candidateId} />

      <div className='container'>
        <InterviewCard interviewId='' candidateId={candidateId} />
      </div>
    </div>
  )
}

export default CandidatePage
