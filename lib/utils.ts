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
