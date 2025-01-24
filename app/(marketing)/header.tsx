import Link from 'next/link'
import { Loader, Menu } from 'lucide-react'
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from '@clerk/nextjs'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg'>
      <nav className='container flex h-16 items-center justify-between'>
        <Sheet>
          <SheetTrigger className='sm:hidden'>
            <Menu className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent side='left'>
            <ul className='flex flex-col gap-6 pt-4'>
              <li>
                <SheetClose asChild>
                  <Link href='/' className='font-sans text-2xl font-bold'>
                    RecruitMind
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link
                    href='#features'
                    className='text-gray-600 hover:text-primary'
                  >
                    Features
                  </Link>
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <div className='flex items-center gap-8'>
          <Link href='/' className='text-2xl font-bold'>
            RecruitMind
          </Link>
          <ul className='hidden items-center gap-6 sm:flex'>
            <li>
              <Link
                href='#features'
                className='text-sm font-medium text-gray-600 hover:text-primary'
              >
                Features
              </Link>
            </li>
          </ul>
        </div>

        <div className='flex items-center gap-4'>
          <ClerkLoading>
            <Loader className='h-5 w-5 animate-spin text-primary' />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <Link href='/customer/interviews'>
                <Button variant='ghost' size='sm'>
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className='flex items-center gap-2'>
                <SignInButton mode='modal'>
                  <Button variant='ghost' size='sm'>
                    Sign in
                  </Button>
                </SignInButton>
                <SignInButton mode='modal'>
                  <Button size='sm'>Get Started</Button>
                </SignInButton>
              </div>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  )
}

export default Header
