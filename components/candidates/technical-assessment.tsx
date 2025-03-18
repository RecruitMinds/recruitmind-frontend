import type { TechnicalAssessment } from '@/data/types/interview'

import ScoreCard from './score-card'
import TranscriptMessage from './transcript-message'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TechnicalAssessmentProps {
  assessment?: TechnicalAssessment
}

const TechnicalAssessment = ({ assessment }: TechnicalAssessmentProps) => {
  const totalScore = assessment?.totalScore ?? 0
  const question = assessment?.question

  return (
    <>
      <h1 className='text-lg font-bold'>Technical Assessment</h1>
      <div className='mt-4 space-y-6'>
        <div className='grid max-w-xs grid-cols-1'>
          <ScoreCard title='Total Score' score={totalScore} />
        </div>

        <Tabs defaultValue='challenges' className='w-full'>
          <TabsList className='grid h-11 w-full grid-cols-2 rounded-[10px]'>
            <TabsTrigger value='challenges' className='rounded-[10px] py-2'>
              Coding Challenges
            </TabsTrigger>
            <TabsTrigger value='transcript' className='rounded-[10px] py-2'>
              Assessment Transcript
            </TabsTrigger>
          </TabsList>

          <TabsContent value='challenges' className='mt-6'>
            <ScrollArea className='flex h-full max-h-96 flex-col'>
              <div className='space-y-6'>
                {question && (
                  <CodingChallenge
                    title={question.question.title}
                    description={question.question.description}
                    solution={question.solution}
                    evaluation={question.evaluation}
                  />
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value='transcript' className='mt-6'>
            <ScrollArea className='flex h-full max-h-96 flex-col'>
              <div className='space-y-4'>
                {assessment?.transcript?.map((message, index) => (
                  <TranscriptMessage
                    key={index}
                    role={message.role}
                    content={message.content}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

const CodingChallenge = ({
  title,
  description,
  solution,
  evaluation
}: {
  title: string
  description: string
  solution: string
  evaluation: string
}) => (
  <div className='space-y-2'>
    <h3 className='font-medium'>{title}</h3>
    <p className='text-sm text-muted-foreground'>{description}</p>
    <pre className='mt-2 rounded-lg bg-secondary p-4'>
      <code className='text-sm'>{solution}</code>
    </pre>
    <p className='text-sm italic text-primary'>{evaluation}</p>
  </div>
)

export default TechnicalAssessment
