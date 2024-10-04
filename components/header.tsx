import Link from 'next/link'
import { Menu } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import HeaderItem from './header-item'

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b bg-background backdrop-blur-sm'>
      <nav className='container flex items-center'>
        <Sheet>
          <SheetTrigger className='sm:hidden'>
            <Menu className='my-[19px] h-6 w-6' />
          </SheetTrigger>
          <SheetContent side='left'>
            <ul className='flex flex-col gap-3 text-sm'>
              <li className='text-2xl font-bold'>
                <SheetClose asChild>
                  <Link href='/'>RecruitMind</Link>
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <div className='hidden items-center gap-10 sm:flex'>
          <Link href='/customer/interviews' className='text-2xl font-bold'>
            RecruitMind
          </Link>

          <ul className='flex items-center gap-0.5 text-sm'>
            <HeaderItem href='/customer/interviews' label='Interviews' />
            <HeaderItem href='/customer/candidates' label='Candidates' />
          </ul>
        </div>

        <div className='ml-auto flex items-center justify-between gap-6'>
          <Button variant={'secondary'} className='size-9 rounded-full p-0'>
            H
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Header
