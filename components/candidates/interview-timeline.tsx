const InterviewTimeline = () => {
  return (
    <dl className='space-y-8 text-sm leading-5'>
      <TimelineItem title='Invited' description='September 30th, 2024' />
      <TimelineItem title='Completed' description='September 30th, 2024' />
      <TimelineItem
        title='Extra time breakdown'
        description='No extra time was granted to this candidate'
      />
      <TimelineItem title='Source' description='Invitation by email' />
      <TimelineItem
        title='Hiring stage'
        description='No extra time was granted to this candidate'
      />
    </dl>
  )
}

export default InterviewTimeline

interface TimelineItemProps {
  title: string
  description?: string | React.ReactNode
}

const TimelineItem = ({ title, description }: TimelineItemProps) => (
  <div className='space-y-3'>
    <dt className='font-bold text-gray-900'>{title}</dt>
    <dd className='text-accent-foreground'>{description}</dd>
  </div>
)
