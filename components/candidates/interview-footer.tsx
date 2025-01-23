'use client'

import { useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

import { useUpdateCandidateInterview } from '@/data/hooks/use-interview'

import StarRating from '@/components/star-rating'
import { Textarea } from '@/components/ui/textarea'

interface InterviewFooterProps {
  interviewId: string
  candidateId: string
  initialRating?: number | null
  initialComment?: string | null
}

const InterviewFooter = ({
  interviewId,
  candidateId,
  initialRating = 0,
  initialComment = ''
}: InterviewFooterProps) => {
  const [rating, setRating] = useState(initialRating || 0)
  const [comment, setComment] = useState(initialComment || '')

  const { mutateAsync } = useUpdateCandidateInterview()

  const handleRating = async (rating: number) => {
    setRating(rating)
    await mutateAsync({
      interview: interviewId,
      candidate: candidateId,
      data: { rating }
    })
  }

  const handleCommentUpdate = useDebounceCallback(async (comment: string) => {
    if (comment !== initialComment) {
      await mutateAsync({
        interview: interviewId,
        candidate: candidateId,
        data: { comment }
      })
    }
  }, 500)

  const handleCommentChange = (value: string) => {
    setComment(value)
    handleCommentUpdate(value)
  }

  return (
    <>
      <div className='flex flex-col gap-3 text-sm tracking-tight'>
        <span className='font-bold'>Your rating</span>
        <span className='pr-16'>
          Give your personal overall rating of this candidate based on your
          impressions and interactions with him or her.
        </span>

        <div className='mt-2'>
          <StarRating
            totalStars={5}
            initialRating={rating}
            onRatingChange={handleRating}
          />
        </div>
      </div>
      <div className='pl-3'>
        <Textarea
          rows={4}
          value={comment}
          onChange={e => handleCommentChange(e.target.value)}
          placeholder='Add your private notes here (auto-saved)...'
          className='mt-2 rounded-[10px] border-foreground/40'
        />
      </div>
    </>
  )
}

export default InterviewFooter
