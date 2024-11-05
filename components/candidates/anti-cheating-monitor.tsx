import {
  Globe,
  MapPin,
  Maximize,
  MonitorSmartphone,
  Mouse,
  Video
} from 'lucide-react'

import { Separator } from '@/components/ui/separator'

const AntiCheatingMonitor = () => {
  return (
    <>
      <div className='mb-3 flex items-center justify-between py-2.5 text-sm'>
        <h3 className='font-bold'>Anti-cheating monitor</h3>
        <span className='cursor-pointer font-medium text-primary underline'>
          Learn more
        </span>
      </div>

      <div className='flex flex-col gap-1.5'>
        <div className='flex items-center justify-between text-sm'>
          <div className='flex items-center gap-2 text-foreground'>
            <MonitorSmartphone className='size-4' />
            <span>Device used</span>
          </div>
          <span className='font-bold'>Desktop</span>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <div className='flex items-center gap-2 text-foreground'>
            <MapPin className='size-4' />
            <span>Location</span>
          </div>
          <span className='font-bold'>Colombo (1), LK</span>
        </div>
        <Separator className='my-2.5' />
      </div>

      <div className='mb-7 space-y-1.5 text-sm text-foreground'>
        {[
          {
            label: 'Filled out only once from IP address?',
            Icon: Globe,
            value: 'Yes'
          },
          { label: 'Webcam enabled?', Icon: Video, value: 'Yes' },
          {
            label: 'Full-screen mode always active?',
            Icon: Maximize,
            value: 'No'
          },
          {
            label: 'Mouse always in assessment window?',
            Icon: Mouse,
            value: 'Yes'
          }
        ].map(({ label, Icon, value }, index) => (
          <div
            key={index}
            className='flex items-center justify-between text-sm'
          >
            <div className='flex items-center gap-2 text-foreground'>
              <Icon className='size-4' />
              <span>{label}</span>
            </div>
            <span
              className={`flex h-6 items-center justify-center rounded-full px-2 text-xs ${value === 'No' ? 'bg-red-300' : 'bg-lime-400'}`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className='relative aspect-video bg-accent'>
        {/* Placeholder for video player */}
      </div>
    </>
  )
}

export default AntiCheatingMonitor
