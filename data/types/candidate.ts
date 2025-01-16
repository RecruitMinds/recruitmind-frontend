export enum CandidateInterviewStatus {
  'INVITED' = 'invited',
  'STARTED' = 'started',
  'COMPLETED' = 'completed',
  'DISQUALIFIED' = 'disqualified'
}

export enum HiringStage {
  NEW = 'not_yet_evaluated',
  EVALUATED = 'evaluated',
  INTERVIEW_INVITED = 'invited_for_interview',
  INTERVIEWED = 'interviewed',
  HIRED = 'hired',
  REJECTED = 'rejected'
}

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
  createdAt: string
  updatedAt: string
}
