'use client'

import { useMemo } from 'react'
import { toast } from 'sonner'
import { Timer } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { CandidateInterviewStatus, HiringStage } from '@/data/types/enums'
import {
  useCandidateInterviewDetails,
  useUpdateCandidateInterview
} from '@/data/hooks/use-interview'

import { Button } from '@/components/ui/button'
import CandidateScore from './candidate-score'
import InterviewTimeline from './interview-timeline'
import EvaluationCriteria from './evaluation-criteria'
import TechnicalInterview from './technical-interview'
import TechnicalAssessment from './technical-assessment'
import AntiCheatingMonitor from './anti-cheating-monitor'

interface InterviewDetailsProps {
  interviewId: string
  candidateId: string
}

const InterviewDetails = ({
  interviewId,
  candidateId
}: InterviewDetailsProps) => {
  const router = useRouter()
  const { data } = useCandidateInterviewDetails(candidateId, interviewId, {
    staleTime: Infinity,
    enabled: false
  })

  const {
    mutateAsync: updateStage,
    isPending: updatingStage,
    variables: updateVars
  } = useUpdateCandidateInterview()

  const hasTechnicalAssessment = useMemo(() => {
    return Boolean(data?.includeTechnicalAssessment)
  }, [data?.includeTechnicalAssessment])

  const handleStageUpdate = async (stage: HiringStage) => {
    await updateStage(
      {
        candidate: candidateId,
        interview: interviewId,
        data: { stage }
      },
      { onError: () => toast.error('Failed to update hiring stage') }
    )
  }

  const isUpdatingCandidate =
    updatingStage && updateVars?.candidate === candidateId

  const isInterviewCompleted =
    data?.status === CandidateInterviewStatus.COMPLETED

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-5 gap-2'>
        <div className='col-span-1 pr-5'>
          <InterviewTimeline
            invitedAt={data?.createdAt}
            completedAt={data?.updatedAt}
            stage={data?.stage}
            status={data?.status}
            includeTechnicalAssessment={data?.includeTechnicalAssessment}
            isUpdatingCandidate={isUpdatingCandidate}
            handleStageUpdate={handleStageUpdate}
          />
        </div>

        <div className='col-span-4 grid grid-cols-2 gap-6'>
          {isInterviewCompleted ? (
            <div className='col-span-1'>
              <CandidateScore
                score={data?.overallScore}
                bestScore={data?.bestScore}
              />
              <EvaluationCriteria
                technicalKnowledge={
                  data?.technicalInterview.technicalSkillsScore
                }
                softSkills={data?.technicalInterview.softSkillsScore}
                problemSolving={data?.technicalAssessment.totalScore}
                hasTechnicalAssessment={hasTechnicalAssessment}
              />
            </div>
          ) : (
            <div className='col-span-1 flex items-center justify-center'>
              <div className='flex max-w-sm flex-col items-center justify-center gap-6 text-center'>
                <Timer className='size-10 stroke-2' />

                <div className='space-y-3'>
                  <strong className='text-lg'>
                    This candidate has not started their interview yet
                  </strong>

                  <p className='text-sm text-accent-foreground'>
                    Therefore there are no test results to show.
                  </p>

                  <Button
                    variant='outline'
                    size='rounded'
                    className='!mt-6'
                    onClick={() => router.back()}
                  >
                    Back to interviews
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className='col-span-1'>
            <AntiCheatingMonitor interviewStatus={data?.status} />
          </div>
        </div>
      </div>

      {isInterviewCompleted && (
        <div className='grid grid-cols-5 gap-6'>
          {!hasTechnicalAssessment && <div className='col-span-1' />}

          <div
            className={cn(
              'col-span-3 rounded-lg border p-6',
              !hasTechnicalAssessment && 'col-span-4'
            )}
          >
            <TechnicalInterview interview={data?.technicalInterview} />
          </div>

          {hasTechnicalAssessment && (
            <div className='col-span-2 rounded-lg border p-6'>
              <TechnicalAssessment assessment={data?.technicalAssessment} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InterviewDetails
