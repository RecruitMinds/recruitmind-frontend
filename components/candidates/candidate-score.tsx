import { Progress } from '@/components/ui/progress'

interface CandidateScoreProps {
  score?: number
  bestScore?: number
}

const CandidateScore = ({ score, bestScore }: CandidateScoreProps) => {
  return (
    <div className='rounded-lg border p-4 pt-7 shadow-sm'>
      <ScoreProgressBar score={score} bestScore={bestScore} />
      <ScoreLegend />

      <p className='mt-4 cursor-pointer text-sm font-medium text-primary underline'>
        How to interpret results
      </p>
    </div>
  )
}

const ScoreProgressBar = ({ score, bestScore }: CandidateScoreProps) => {
  const scoreValue = score ?? 0
  const bestScoreValue = bestScore ?? 0

  return (
    <div className='mb-5 flex items-center gap-11'>
      <div className='relative h-4 w-full'>
        <Progress
          value={scoreValue}
          max={100}
          className='relative h-4 w-full'
        />
        <div className='absolute inset-0 flex items-center justify-between text-xs'>
          <span className='px-2 text-white'>0%</span>
          <span className='px-2 text-black'>100%</span>
        </div>

        {/* Candidate average marker */}
        <div
          style={{ width: `${scoreValue}%` }}
          className='absolute -top-3 h-5 border-r-2 border-black'
        />
        <div
          className='absolute -top-9 -translate-x-1/2 transform rounded-full border border-black px-2 py-0.5 text-xs font-bold text-gray-500'
          style={{ left: `${scoreValue}%` }}
        >
          {scoreValue}%
        </div>

        {/* Best candidate marker */}
        <div
          style={{ width: `${bestScoreValue}%` }}
          className='absolute -bottom-3 h-3 border-r-2 border-black'
        />
        <div
          className='absolute -bottom-9 -translate-x-1/2 transform rounded-full border border-dashed border-muted-foreground px-2 py-0.5 text-xs font-bold text-gray-500'
          style={{ left: `${bestScoreValue}%` }}
        >
          {bestScoreValue}%
        </div>
      </div>

      <div className='flex flex-col font-bold tracking-tight'>
        <span className='text-[40px] leading-[50px]'>{scoreValue}%</span>
        <span className='text-xs'>Average score</span>
      </div>
    </div>
  )
}

const ScoreLegend = () => {
  return (
    <div className='flex items-center gap-2 text-xs leading-4 tracking-tighter'>
      <strong>This interview:</strong>
      <span className='flex items-center gap-1 text-[10px] text-muted-foreground'>
        <div className='h-2.5 w-4 rounded-full border border-muted-foreground' />
        Your candidate pool average
      </span>
      <span className='flex items-center gap-1 text-[10px] text-muted-foreground'>
        <div className='h-2.5 w-4 rounded-full border border-dashed border-muted-foreground' />
        Your best candidate score
      </span>
    </div>
  )
}

export default CandidateScore
