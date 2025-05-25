import {
  CandidateInterviewStatus,
  HiringStage,
  InterviewStatus,
  SkillLevel,
  WorkArrangements
} from './enums'

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
  skills: string[]
  experience: string
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

export interface UpdateCandidateInterview {
  status?: CandidateInterviewStatus
  stage?: HiringStage
  rating?: number
  comment?: string
}

type Transcript = { role: string; content: string }[]

export interface TechnicalInterview {
  totalScore: number | null
  technicalSkillsScore: number | null
  softSkillsScore: number | null
  questions?: {
    question: string
    answer: string
    evaluation: string
  }[]
  transcript?: Transcript
  skillsEvaluation?: {
    skill: string
    evaluation: string
    score: string
  }[]
}

export interface TechnicalAssessment {
  totalScore: number | null
  question?: {
    question: {
      title: string
      description: string
      examples: { input: string; output: string; explanations: string }[]
      constraints: string[]
    }
    solution: string
    evaluation: string
  } | null
  transcript?: Transcript
}

export interface CandidateInterviewDetail {
  _id: string
  name: string
  status: CandidateInterviewStatus
  stage: HiringStage
  bestScore: number
  overallScore: number
  invitationToken: string
  includeTechnicalAssessment: boolean
  technicalInterview: TechnicalInterview
  technicalAssessment: TechnicalAssessment
  rating: number | null
  comment: string | null
  createdAt: string
  updatedAt: string
}
