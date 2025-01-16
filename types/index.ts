import { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClasses?: string
    cellClasses?: string
  }
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
