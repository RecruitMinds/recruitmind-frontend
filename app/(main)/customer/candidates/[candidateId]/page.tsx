import CandidateHeader from '@/components/candidates/candidate-header'
import InterviewCard from '@/components/candidates/interview-card'

const CandidatePage = () => {
  return (
    <div className='flex flex-col gap-11 pb-12 pt-[60px]'>
      <CandidateHeader />

      <div className='container'>
        <InterviewCard />
      </div>
    </div>
  )
}

export default CandidatePage
