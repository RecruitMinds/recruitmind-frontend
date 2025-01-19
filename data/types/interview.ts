export enum InterviewStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

export enum SkillLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export enum WorkArrangements {
  REMOTE = 'remote',
  ONSITE = 'onsite',
  HYBRID = 'hybrid'
}

export interface InterviewProgress {
  candidates: number
  invited: number
  started: number
  completed: number
  disqualified: number
  completed_percentage: number | null
}

export interface Interview {
  _id: string
  name: string
  description: string
  role: string
  location: string
  workArrangements: WorkArrangements
  skillLevel: SkillLevel
  status: InterviewStatus
  includeTechnicalAssessment: boolean
  recruiter: string
  createdAt: string
  updatedAt: string
}

export interface CreateInterview {
  name: string
  description: string
  role: string
  location: string
  workArrangements: WorkArrangements
  skillLevel?: SkillLevel
  includeTechnicalAssessment: boolean
  status: InterviewStatus
}

export interface InviteCandidate {
  firstName: string
  lastName: string
  email: string
}

export interface InterviewList {
  _id: string
  name: string
}

type Transcript = { role: string; content: string }[]

export interface TechnicalInterview {
  totalScore: number | null
  technicalSkillsScore: number | null
  softSkillsScore: number | null
  questions: {
    question: string
    answer: string
    evaluation: string
  }[]
  transcript: Transcript
}

export interface TechnicalAssessment {
  totalScore: number | null
  questions: {
    question: {
      title: string
      description: string
      examples: { input: string; output: string; explanations: string }[]
      constraints: string[]
    }
    solution: string
    evaluation: string
  }[]
  transcript: Transcript
}
