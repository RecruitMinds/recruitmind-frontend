import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'

const evaluationCriteria = [
  {
    name: 'Core Technical Knowledge',
    score: 58,
    description:
      "Assesses the candidate's understanding of fundamental JavaScript concepts such as variables, data types, functions, closures, and the event loop.",
    subCriteria: [
      'Variables and scoping',
      'Data types and coercion',
      'Functions and closures',
      'Prototypes and inheritance',
      'Asynchronous JavaScript (Promises, async/await)'
    ]
  },
  {
    name: 'Problem-Solving Skills',
    score: 17,
    description:
      "Evaluates the candidate's ability to solve algorithmic problems, optimize code, and handle edge cases using JavaScript.",
    subCriteria: [
      'Algorithm implementation',
      'Code optimization',
      'Debugging skills',
      'Edge case handling',
      'Time and space complexity analysis'
    ]
  },
  // {
  //   name: 'Modern JavaScript Ecosystem',
  //   score: 17,
  //   description:
  //     "Measures the candidate's familiarity with modern JavaScript tools, frameworks, and best practices.",
  //   subCriteria: [
  //     'ES6+ features',
  //     'Node.js and npm',
  //     'Babel and webpack',
  //     'React, Vue, or Angular knowledge',
  //     'Testing frameworks (Jest, Mocha)'
  //   ]
  // },
  // {
  //   name: 'Code Quality and Best Practices',
  //   score: 20,
  //   description:
  //     "Assesses the candidate's ability to write clean, maintainable, and efficient JavaScript code.",
  //   subCriteria: [
  //     'Code readability and organization',
  //     'Proper error handling',
  //     'Performance considerations',
  //     'Security best practices',
  //     'Documentation and comments'
  //   ]
  // },
  {
    name: 'Soft Skills and Collaboration',
    score: 12,
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

const EvaluationCriteria = () => {
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
        {evaluationCriteria.map((criteria, i) => (
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
