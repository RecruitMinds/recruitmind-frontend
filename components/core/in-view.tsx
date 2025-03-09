'use client'

import { ReactNode, useRef } from 'react'
import {
  motion,
  useInView,
  Variant,
  Transition,
  UseInViewOptions
} from 'motion/react'
import { cn } from '@/lib/utils'

export type InViewProps = {
  children: ReactNode
  variants?: {
    hidden: Variant
    visible: Variant
  }
  transition?: Transition
  viewOptions?: UseInViewOptions
  as?: React.ElementType
  className?: string
}

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export function InView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions,
  as = 'div',
  className
}: InViewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, viewOptions)

  const MotionComponent = motion[as as keyof typeof motion] as typeof as

  return (
    <MotionComponent
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  )
}
