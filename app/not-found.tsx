'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { InView } from '@/components/core/in-view'
import { TextEffect } from '@/components/core/text-effect'

const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8'>
      <div className='fixed left-0 top-0 -z-10 h-full w-full'>
        <div className='relative h-full w-full bg-white'>
          <div className='absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]'></div>
        </div>
      </div>
      <div className='mx-auto w-full max-w-4xl space-y-8 text-center'>
        {/* Main 404 text */}
        <InView
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.7 }}
          viewOptions={{ once: true }}
        >
          <div className='mb-6 text-9xl font-bold text-primary/80'>
            <TextEffect preset='fade-in-blur' per='char'>
              404
            </TextEffect>
          </div>
        </InView>

        {/* Message */}
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewOptions={{ once: true }}
        >
          <h1 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>
            <TextEffect preset='slide' per='word'>
              Page not found
            </TextEffect>
          </h1>
        </InView>

        <InView
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewOptions={{ once: true }}
        >
          <p className='mx-auto mb-8 max-w-lg text-lg text-gray-600'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or deleted.
          </p>
        </InView>

        {/* Buttons */}
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewOptions={{ once: true }}
        >
          <Button asChild size='rounded' className='gap-2'>
            <Link href='/'>Back to Home</Link>
          </Button>
        </InView>
      </div>
    </div>
  )
}

export default NotFoundPage
