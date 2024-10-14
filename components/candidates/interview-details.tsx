import CandidateScore from './candidate-score'
import InterviewTimeline from './interview-timeline'
import EvaluationCriteria from './evaluation-criteria'
import AntiCheatingMonitor from './anti-cheating-monitor'

const InterviewDetails = () => {
  return (
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
  )
}

export default InterviewDetails
