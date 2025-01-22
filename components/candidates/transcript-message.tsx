const TranscriptMessage = ({
  role,
  content
}: {
  role: string
  content: string
}) => (
  <div className='space-y-1'>
    <p className='font-medium'>{role}:</p>
    <p className='text-sm text-muted-foreground'>{content}</p>
  </div>
)

export default TranscriptMessage
