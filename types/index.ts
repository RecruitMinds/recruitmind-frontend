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
