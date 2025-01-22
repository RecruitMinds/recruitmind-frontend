import { cn } from '@/lib/utils'

import CandidateScore from './candidate-score'
import InterviewTimeline from './interview-timeline'
import EvaluationCriteria from './evaluation-criteria'
import TechnicalInterview from './technical-interview'
import TechnicalAssessment from './technical-assessment'
import AntiCheatingMonitor from './anti-cheating-monitor'

const InterviewDetails = () => {
  const is_include_technical_assessment = true

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-5 gap-2'>
        <div className='col-span-1 pr-5'>
          <InterviewTimeline />
        </div>

        <div className='col-span-4 grid grid-cols-2 gap-6'>
          <div className='col-span-1'>
            <CandidateScore />
            <EvaluationCriteria />
          </div>

          <div className='col-span-1'>
            <AntiCheatingMonitor />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-5 gap-6'>
        {!is_include_technical_assessment && <div className='col-span-1' />}

        <div
          className={cn(
            'col-span-3 rounded-lg border p-6',
            !is_include_technical_assessment && 'col-span-4'
          )}
        >
          <TechnicalInterview />
        </div>

        {is_include_technical_assessment && (
          <div className='col-span-2 rounded-lg border p-6'>
            <TechnicalAssessment />
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewDetails
