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
    <header className='fixed inset-x-0 top-0 z-50 border-b bg-background py-4 backdrop-blur-sm'>
      <nav className='container flex items-center justify-between'>
        <Sheet>
          <SheetTrigger className='sm:hidden'>
            <Menu className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent side='left'>
            <ul className='flex flex-col gap-3 text-sm'>
              <li className='font-sans text-2xl'>
                <SheetClose asChild>
                  <Link href='/'>RecruitMind</Link>
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <ul className='hidden items-center gap-14 text-sm font-medium sm:flex'>
          <li className='text-2xl font-bold'>
            <Link href='/'>RecruitMind</Link>
          </li>
        </ul>

        <div className='flex items-center justify-between gap-6'>
          <ClerkLoading>
            <Loader className='h-5 w-5 animate-spin text-muted-foreground' />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton
                mode='modal'
                fallbackRedirectUrl='/customer/interviews'
                signUpFallbackRedirectUrl='/customer/interviews'
              >
                <Button size='lg' variant='ghost'>
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  )
}

export default Header
