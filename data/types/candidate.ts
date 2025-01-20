import { CandidateInterviewStatus, HiringStage } from './enums'
import { TechnicalAssessment, TechnicalInterview } from './interview'

export interface Candidate {
  _id: string
  email: string
  createdAt: string
  updatedAt: string
  fullName: string
  interviews_count: number
}

export interface CandidateList {
  _id: string
  email: string
  fullName: string
  status: CandidateInterviewStatus
  stage: HiringStage
  overallScore: number | null
  technicalInterview: Omit<TechnicalInterview, 'questions' | 'transcript'>
  technicalAssessment: Omit<TechnicalAssessment, 'questions' | 'transcript'>
  invitationToken: string
  rating: number | null
  comment: string | null
  createdAt: string
  updatedAt: string
}
