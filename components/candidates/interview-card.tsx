import { CandidateInterviewStatus } from '@/data/types/enums'
import { useCandidateInterviewDetails } from '@/data/hooks/use-interview'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import InterviewHeader from './interview-header'
import InterviewDetails from './interview-details'
import InterviewFooter from './interview-footer'

interface InterviewCardProps {
  interviewId: string
  candidateId: string
}

const InterviewCard = ({ interviewId, candidateId }: InterviewCardProps) => {
  const { data } = useCandidateInterviewDetails(candidateId, interviewId, {
    staleTime: Infinity,
    enabled: false
  })

  const isInterviewCompleted =
    data?.status === CandidateInterviewStatus.COMPLETED

  return (
    <Card className='w-full rounded-[10px] shadow-sm'>
      <CardHeader className='p-10'>
        <InterviewHeader interviewId={interviewId} candidateId={candidateId} />
      </CardHeader>

      <CardContent className={`px-10 ${!isInterviewCompleted && 'pb-10'}`}>
        <InterviewDetails interviewId={interviewId} candidateId={candidateId} />
      </CardContent>

      {isInterviewCompleted && (
        <CardFooter className='mt-3 grid grid-cols-2 border-t p-10'>
          <InterviewFooter
            interviewId={interviewId}
            candidateId={candidateId}
          />
        </CardFooter>
      )}
    </Card>
  )
}

export default InterviewCard
