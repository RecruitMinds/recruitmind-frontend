import type { TechnicalInterview } from '@/data/types/interview'

import ScoreCard from './score-card'
import TranscriptMessage from './transcript-message'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TechnicalInterviewProps {
  interview?: TechnicalInterview
}

const TechnicalInterview = ({ interview }: TechnicalInterviewProps) => {
  const totalScore = interview?.totalScore ?? 0
  const technicalSkillsScore = interview?.technicalSkillsScore ?? 0
  const softSkillsScore = interview?.softSkillsScore ?? 0

  return (
    <>
      <h1 className='text-lg font-bold'>Technical Interview</h1>
      <div className='mt-4 space-y-6'>
        <div className='grid grid-cols-3 gap-4'>
          <ScoreCard title='Total Score' score={totalScore} />
          <ScoreCard title='Technical Skills' score={technicalSkillsScore} />
          <ScoreCard title='Soft Skills' score={softSkillsScore} />
        </div>

        <Tabs defaultValue='evaluation' className='w-full'>
          <TabsList className='grid h-11 w-full grid-cols-3 rounded-[10px]'>
            <TabsTrigger value='evaluation' className='rounded-[10px] py-2'>
              Questions & Evaluations
            </TabsTrigger>
            <TabsTrigger value='transcript' className='rounded-[10px] py-2'>
              Transcript
            </TabsTrigger>
            <TabsTrigger value='skills' className='rounded-[10px] py-2'>
              Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value='evaluation' className='mt-6'>
            <ScrollArea className='flex h-full max-h-96 flex-col'>
              <div className='space-y-6'>
                {interview?.questions?.map((question, index) => (
                  <QuestionEvaluation
                    key={index}
                    question={question.question}
                    answer={question.answer}
                    evaluation={question.evaluation}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value='transcript' className='mt-6'>
            <ScrollArea className='flex h-full max-h-96 flex-col'>
              <div className='space-y-4'>
                {interview?.transcript?.map((message, index) => (
                  <TranscriptMessage
                    key={index}
                    role={message.role}
                    content={message.content}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value='skills' className='mt-6'>
            <ScrollArea className='flex h-full max-h-96 flex-col'>
              <div className='space-y-4'>
                {interview?.skillsEvaluation?.map((skill, index) => (
                  <SkillEvaluation
                    key={index}
                    skill={skill.skill}
                    evaluation={skill.evaluation}
                    score={skill.score}
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

const SkillEvaluation = ({
  skill,
  evaluation,
  score
}: {
  skill: string
  evaluation: string
  score: string
}) => {
  const scoreNum = parseInt(score)
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-500'
    if (score >= 6) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className='rounded-lg border p-4'>
      <div className='flex items-center justify-between'>
        <h3 className='font-medium'>{skill}</h3>
        <span className={`font-medium ${getScoreColor(scoreNum)}`}>
          {score}/10
        </span>
      </div>
      <p className='mt-2 text-sm text-muted-foreground'>{evaluation}</p>
    </div>
  )
}

export default TechnicalInterview
