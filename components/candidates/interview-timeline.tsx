import { formatLongDate } from '@/lib/utils'
import { HiringStage } from '@/data/types/enums'

import HiringStageSelect from '../hiring-stage-select'

interface InterviewTimelineProps {
  invitedAt?: string
  completedAt?: string
  stage?: string
  isUpdatingCandidate: boolean
  handleStageUpdate: (stage: HiringStage) => Promise<void>
}

const InterviewTimeline = ({
  invitedAt,
  completedAt,
  stage,
  isUpdatingCandidate,
  handleStageUpdate
}: InterviewTimelineProps) => {
  return (
    <dl className='space-y-8 text-sm leading-5'>
      <TimelineItem
        title='Invited'
        description={invitedAt ? formatLongDate(invitedAt) : '_'}
      />
      <TimelineItem
        title='Completed'
        description={completedAt ? formatLongDate(completedAt) : '_'}
      />
      <TimelineItem
        title='Extra time breakdown'
        description='No extra time was granted to this candidate'
      />
      <TimelineItem title='Source' description='Invitation by email' />
      <TimelineItem title='Hiring stage'>
        <HiringStageSelect
          value={stage as HiringStage}
          onValueChange={async newStage => {
            await handleStageUpdate(newStage)
          }}
          className='w-[calc(100%-1rem)]'
          loading={isUpdatingCandidate}
        />
      </TimelineItem>
    </dl>
  )
}

export default InterviewTimeline

interface TimelineItemProps {
  title: string
  description?: string
  children?: React.ReactNode
}

const TimelineItem = ({ title, description, children }: TimelineItemProps) => (
  <div className='space-y-3'>
    <dt className='font-bold text-gray-900'>{title}</dt>
    <dd className='text-accent-foreground'>
      {description} {children}
    </dd>
  </div>
)
