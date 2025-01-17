import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import InterviewHeader from './interview-header'
import InterviewDetails from './interview-details'
import InterviewFooter from './interview-footer'

const InterviewCard = () => {
  return (
    <Card className='w-full rounded-[10px] shadow-sm'>
      <CardHeader className='p-10'>
        <InterviewHeader />
      </CardHeader>

      <CardContent className='px-10'>
        <InterviewDetails />
      </CardContent>

      <CardFooter className='mt-3 grid grid-cols-2 border-t p-10'>
        <InterviewFooter />
      </CardFooter>
    </Card>
  )
}

export default InterviewCard
