'use client'

import Link from 'next/link'
import { Loader, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from '@clerk/nextjs'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import HeaderItem from './header-item'

const BetaTag = () => (
  <span className='ml-1 rounded-md bg-primary/10 px-1.5 py-0.5 align-top text-xs font-medium text-primary'>
    Beta
  </span>
)

const Header = () => {
  const pathName = usePathname()
  const isNewInterview = pathName.includes('/customer/interviews/new')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background backdrop-blur-sm ${isNewInterview && 'hidden'}`}
    >
      <nav className='container flex items-center'>
        <Sheet>
          <SheetTrigger className='sm:hidden'>
            <Menu className='my-[19px] h-6 w-6' />
          </SheetTrigger>
          <SheetContent side='left'>
            <ul className='flex flex-col gap-3 text-sm'>
              <li className='text-2xl font-bold'>
                <SheetClose asChild>
                  <Link href='/'>
                    RecruitMind
                    <BetaTag />
                  </Link>
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <div className='hidden items-center gap-10 sm:flex'>
          <Link
            href='/customer/interviews'
            className='text-2xl font-bold leading-tight tracking-tight'
          >
            RecruitMind
            <BetaTag />
          </Link>

          <ul className='flex items-center gap-0.5 text-sm tracking-tight'>
            <HeaderItem href='/customer/interviews' label='Interviews' />
            <HeaderItem href='/customer/candidates' label='Candidates' />
          </ul>
        </div>

        <div className='ml-auto flex items-center justify-between gap-6'>
          <ClerkLoading>
            <Loader className='h-5 w-5 animate-spin text-muted-foreground' />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton
                userProfileMode='navigation'
                userProfileUrl='/profile'
                appearance={{ elements: { userButtonAvatarBox: 'h-9 w-9' } }}
              />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  )
}

export default Header
