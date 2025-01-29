'use client'

import { Star } from 'lucide-react'
import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

interface StarRatingProps {
  totalStars: number
  initialRating: number
  readOnly?: boolean
  onRatingChange?: (rating: number) => void
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  initialRating = 0,
  readOnly = false,
  onRatingChange
}) => {
  const [hover, setHover] = useState(0)

  const stars = useMemo(
    () => Array.from({ length: totalStars }, (_, index) => index + 1),
    [totalStars]
  )

  return (
    <div
      role='radiogroup'
      aria-label='Rating stars'
      className='flex items-center gap-1'
    >
      {stars.map(starValue => (
        <Star
          key={starValue}
          role='radio'
          aria-checked={starValue <= (hover || initialRating)}
          aria-label={`Rate ${starValue} out of ${totalStars}`}
          onMouseEnter={() => !readOnly && setHover(starValue)}
          onMouseLeave={() => !readOnly && setHover(initialRating)}
          onClick={() => !readOnly && onRatingChange?.(starValue)}
          className={cn(
            'size-5 fill-current',
            !readOnly && 'cursor-pointer',
            starValue <= (hover || initialRating)
              ? 'text-primary'
              : 'text-input',
            !readOnly && 'hover:text-primary'
          )}
        />
      ))}
    </div>
  )
}

export default StarRating
