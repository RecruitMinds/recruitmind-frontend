import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'

interface EvaluationCriteria {
  technicalKnowledge?: number | null
  problemSolving?: number | null
  softSkills?: number | null
  hasTechnicalAssessment: boolean
}

const evaluationCriterias = ({
  technicalKnowledge,
  problemSolving,
  softSkills,
  hasTechnicalAssessment
}: EvaluationCriteria) => {
  const technicalScore = technicalKnowledge ?? 0
  const problemSolvingScore = problemSolving ?? 0
  const softSkillsScore = softSkills ?? 0

  const baseCriteria = [
    {
      name: 'Core Technical Knowledge',
      score: technicalScore,
      description:
        "Assesses the candidate's technical knowledge in core programming concepts.",
      subCriteria: [
        'Data structures',
        'Algorithms',
        'Object-oriented programming',
        'Design patterns',
        'Database management'
      ]
    },
    {
      name: 'Soft Skills and Collaboration',
      score: softSkillsScore,
      description:
        "Evaluates the candidate's communication skills, ability to explain technical concepts, and potential for team collaboration.",
      subCriteria: [
        'Clear communication of ideas',
        'Ability to explain complex concepts',
        'Receptiveness to feedback',
        'Problem-solving approach',
        'Team collaboration potential'
      ]
    }
  ]

  if (hasTechnicalAssessment) {
    baseCriteria.splice(1, 0, {
      name: 'Problem-Solving Skills',
      score: problemSolvingScore,
      description:
        "Evaluates the candidate's ability to solve algorithmic problems, optimize code.",
      subCriteria: [
        'Problem-solving approach',
        'Code optimization',
        'Algorithmic thinking',
        'Code readability',
        'Code structure'
      ]
    })
  }

  return baseCriteria
}

const EvaluationCriteria = (props: EvaluationCriteria) => {
  const criterias = evaluationCriterias(props)

  return (
    <div className='mt-6 rounded-lg bg-secondary p-6'>
      <div className='mb-4 flex flex-col tracking-normal'>
        <span className='text-xs leading-relaxed'>Evaluation method</span>
        <h3 className='text-sm font-bold leading-relaxed'>
          Interview evaluation criteria
        </h3>
      </div>

      <span className='text-xs font-bold leading-[48px]'>
        Criteria included in evaluation
      </span>

      <Accordion type='single' collapsible className='space-y-3'>
        {criterias.map((criteria, i) => (
          <AccordionItem
            key={i}
            value={criteria.name}
            className='rounded-[8px] border bg-white pl-3 pr-6 shadow-sm'
          >
            <AccordionTrigger className='h-11 flex-row-reverse'>
              <div className='flex w-full items-center justify-between pl-2 text-sm font-normal'>
                <span>{criteria.name}</span>
                <span>{criteria.score}%</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-6'>
              <Separator className='mb-2' />
              {criteria.description}
              <Separator className='my-2 mb-4' />
              <ul className='mt-3 list-disc pl-5'>
                {criteria.subCriteria.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Separator className='my-2 mt-4' />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default EvaluationCriteria
