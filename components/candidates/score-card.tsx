const ScoreCard = ({ title, score }: { title: string; score: number }) => (
  <div className='rounded-lg bg-secondary p-4'>
    <h3 className='text-sm font-medium text-muted-foreground'>{title}</h3>
    <p className='mt-1 text-2xl font-bold'>{score}%</p>
  </div>
)

export default ScoreCard
