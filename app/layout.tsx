import type { Metadata } from 'next'
import './globals.css'

import Providers from './providers'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'RecruitMind',
  description:
    'RecruitMind is a platform that helps you find the best candidates for your company.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang='en' className='scroll-smooth'>
        <body className='antialiased'>
          {children}
          <Toaster />
        </body>
      </html>
    </Providers>
  )
}
