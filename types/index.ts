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
