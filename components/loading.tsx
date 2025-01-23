import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <Loader2 className='size-12 animate-spin stroke-2' />
    </div>
  )
}

export default Loading
