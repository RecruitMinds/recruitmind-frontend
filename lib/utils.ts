import dayjs from 'dayjs'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRelativeDate = (date: string) => dayjs(date).fromNow()
export const formatDate = (date: string) => dayjs(date).format('MMM D, YYYY')
export const toShortDate = (date: string) => dayjs(date).format('YYYY-MM-DD')
export const formatLongDate = (date: string) => {
  const d = dayjs(date)
  return `${d.format('MMMM')} ${d.format('D')}${getOrdinalSuffix(d.date())}, ${d.format('YYYY')}`
}

function getOrdinalSuffix(day: number): string {
  const j = day % 10
  const k = day % 100
  if (j == 1 && k != 11) return 'st'
  if (j == 2 && k != 12) return 'nd'
  if (j == 3 && k != 13) return 'rd'
  return 'th'
}

export function formatSnakeCase(str: string): string {
  if (!str) return ''

  const words = str.split('_')
  return words
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toLowerCase()
    )
    .join(' ')
}

export function getInitials(name: string) {
  return name
    .split(/\s/)
    .map(part => part.substring(0, 1).toUpperCase())
    .filter(v => !!v)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
