'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface HeaderItemProps {
  href: string
  label: string
}

const HeaderItem = ({ href, label }: HeaderItemProps) => {
  const pathName = usePathname()
  const active = pathName === href

  return (
    <li
      className={cn(
        'hover:border-b-2 hover:border-b-foreground',
        active && 'border-b-2 border-b-primary font-bold'
      )}
    >
      <Link href={href}>
        <p className='px-6 py-5'>{label}</p>
      </Link>
    </li>
  )
}

export default HeaderItem
