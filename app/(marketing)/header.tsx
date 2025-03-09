import Link from 'next/link'
import { Loader } from 'lucide-react'
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg'>
      <nav className='container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-8'>
          <Link
            href='/'
            className='text-2xl font-bold tracking-tight transition-colors duration-300 hover:text-primary'
          >
            RecruitMind
          </Link>
        </div>

        {/* <div className='mx-auto flex w-full items-center justify-center'> */}
        <ul className='hidden items-center gap-6 sm:flex'>
          <li>
            <Link
              href='#features'
              className='text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-primary'
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href='#how-it-works'
              className='text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-primary'
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              href='#testimonials'
              className='text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-primary'
            >
              Testimonials
            </Link>
          </li>
        </ul>
        {/* </div> */}

        <div className='flex items-center gap-4'>
          <ClerkLoading>
            <Loader className='h-5 w-5 animate-spin text-primary' />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <Link href='/customer/interviews'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='transition-colors duration-300 hover:bg-primary/10 hover:text-primary'
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className='flex items-center gap-2'>
                <SignInButton>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='transition-colors duration-300 hover:bg-primary/10 hover:text-primary'
                  >
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    size='sm'
                    className='rounded-full bg-primary shadow-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-md'
                  >
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  )
}

export default Header
