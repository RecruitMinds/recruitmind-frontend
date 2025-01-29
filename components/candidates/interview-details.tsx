'use client'

import { useMemo } from 'react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { HiringStage } from '@/data/types/enums'
import {
  useCandidateInterviewDetails,
  useUpdateCandidateInterview
} from '@/data/hooks/use-interview'

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

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-5 gap-2'>
        <div className='col-span-1 pr-5'>
          <InterviewTimeline
            invitedAt={data?.createdAt}
            completedAt={data?.updatedAt}
            stage={data?.stage}
            isUpdatingCandidate={isUpdatingCandidate}
            handleStageUpdate={handleStageUpdate}
          />
        </div>

        <div className='col-span-4 grid grid-cols-2 gap-6'>
          <div className='col-span-1'>
            <CandidateScore
              score={data?.overallScore}
              bestScore={data?.bestScore}
            />
            <EvaluationCriteria
              technicalKnowledge={data?.technicalInterview.technicalSkillsScore}
              softSkills={data?.technicalInterview.softSkillsScore}
              problemSolving={data?.technicalAssessment.totalScore}
              hasTechnicalAssessment={hasTechnicalAssessment}
            />
          </div>

          <div className='col-span-1'>
            <AntiCheatingMonitor />
          </div>
        </div>
      </div>

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
    </div>
  )
}

export default InterviewDetails
