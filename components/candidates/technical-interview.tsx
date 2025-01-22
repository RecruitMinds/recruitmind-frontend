import ScoreCard from './score-card'
import TranscriptMessage from './transcript-message'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const TechnicalInterview = () => {
  return (
    <>
      <h1 className='text-lg font-bold'>Technical Interview</h1>
      <div className='mt-4 space-y-6'>
        <div className='grid grid-cols-3 gap-4'>
          <ScoreCard title='Total Score' score={85} />
          <ScoreCard title='Technical Skills' score={82} />
          <ScoreCard title='Soft Skills' score={88} />
        </div>

        <Tabs defaultValue='evaluation' className='w-full'>
          <TabsList className='grid h-11 w-full grid-cols-2 rounded-[10px]'>
            <TabsTrigger value='evaluation' className='rounded-[10px] py-2'>
              Questions & Evaluations
            </TabsTrigger>
            <TabsTrigger value='transcript' className='rounded-[10px] py-2'>
              Interview Transcript
            </TabsTrigger>
          </TabsList>

          <TabsContent value='evaluation' className='mt-6'>
            <ScrollArea className='flex h-full max-h-96 flex-col'>
              <div className='space-y-6'>
                <QuestionEvaluation
                  question='Explain JavaScript closures and their practical use cases.'
                  answer='A closure is a function that has access to variables in its outer scope even after the outer function has returned. They are commonly used for data privacy and maintaining state.'
                  evaluation='Candidate demonstrated strong understanding of closures with practical examples.'
                />
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value='transcript' className='mt-6'>
            <ScrollArea className='flex h-full max-h-96 flex-col'>
              <div className='space-y-4'>
                <TranscriptMessage
                  role='AI Interviewer'
                  content='Can you explain what a closure is in JavaScript?'
                />
                <TranscriptMessage
                  role='Candidate'
                  content="A closure is formed when a function is defined inside another function. The inner function has access to variables in its own scope, in the outer function's scope, and in the global scope."
                />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

const QuestionEvaluation = ({
  question,
  answer,
  evaluation
}: {
  question: string
  answer: string
  evaluation: string
}) => (
  <div className='space-y-2'>
    <h3 className='font-medium'>{question}</h3>
    <p className='text-sm text-muted-foreground'>{answer}</p>
    <p className='text-sm italic text-primary'>{evaluation}</p>
  </div>
)

export default TechnicalInterview
