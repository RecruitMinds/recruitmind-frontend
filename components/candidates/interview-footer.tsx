import StarRating from '@/components/star-rating'
import { Textarea } from '@/components/ui/textarea'

const InterviewFooter = () => {
  return (
    <>
      <div className='flex flex-col gap-3 text-sm tracking-tight'>
        <span className='font-bold'>Your rating</span>
        <span className='pr-16'>
          Give your personal overall rating of this candidate based on your
          impressions and interactions with him or her.
        </span>

        <div className='mt-2'>
          <StarRating totalStars={5} />
        </div>
      </div>
      <div className='pl-3'>
        <Textarea
          placeholder='Add your private notes here (auto-saved)...'
          rows={4}
          className='mt-2 rounded-[10px] border-foreground/40'
        />
      </div>
    </>
  )
}

export default InterviewFooter
