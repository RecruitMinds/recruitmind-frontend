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

export interface Interview {
  _id: string
  name: string
  description: string
  role: string
  location: string
  workArrangements: WorkArrangements
  skillLevel: SkillLevel
  status: InterviewStatus
  recruiter: string
  createdAt: string
  updatedAt: string
  candidates: number
  invited: number
  started: number
  completed: number
  disqualified: number
  completed_percentage: number | null
}

export interface InterviewList {
  _id: string
  name: string
}
