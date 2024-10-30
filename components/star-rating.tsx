'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'

const StarRating = ({ totalStars = 5, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  return (
    <div className='flex items-center gap-1'>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1

        return (
          <Star
            key={index}
            className={`size-5 cursor-pointer fill-current ${
              starValue <= (hover || rating) ? 'text-primary' : 'text-input'
            } hover:text-primary`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(rating)}
          />
        )
      })}
    </div>
  )
}

export default StarRating
