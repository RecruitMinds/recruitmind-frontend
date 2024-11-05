import { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClasses?: string
    cellClasses?: string
  }
}

export type Interview = {
  id: string
  name: string
  candidates: number
  progress: {
    completed: number
    started: number
    notStarted: number
    disqualified: number
  }
  status: 'active' | 'inactive' | 'archived'
  lastActivity: string
  dateCreated: string
  dateExpires: string | null
}

export type Candidate = {
  id: string
  name: string
  email: string
  interviews: number
  jobRole:
    | '.NET Developer'
    | 'JavaScript Developer'
    | 'React Developer'
    | 'Python Developer'
    | 'Java Developer'
  lastActivity: string
}

export type CandidateList = {
  id: number
  name: string
  overall: string
  scores: {
    'Core .NET Technical Expertise': string
    'Architecture and Development Practices': string
    'Problem-Solving and Technical Analysis': string
    'Professional Skills and Collaboration': string
  }
  stage: string
  status: string
  invitedOn: string
  overallRating: number
}
