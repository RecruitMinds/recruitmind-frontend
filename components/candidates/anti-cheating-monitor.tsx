import { MapPin, MonitorSmartphone, Mouse, Video } from 'lucide-react'

import { cn } from '@/lib/utils'
import { CandidateInterviewStatus } from '@/data/types/enums'

import { Separator } from '@/components/ui/separator'
import { useCandidateInterviewDetails } from '@/data/hooks/use-interview'
import { useEffect, useState } from 'react'

interface AntiCheatingMonitorProps {
  interviewStatus?: CandidateInterviewStatus
  interviewId: string
  candidateId: string
}

interface meta_info {
  device_name: string
  location: string
  tab_switch_count: number
}

const AntiCheatingMonitor = ({
  interviewStatus,
  interviewId,
  candidateId
}: AntiCheatingMonitorProps) => {
  const isInterviewCompleted =
    interviewStatus === CandidateInterviewStatus.COMPLETED
  const { data } = useCandidateInterviewDetails(candidateId, interviewId)
  const [metaInfo, setMetaInfo] = useState<meta_info | null>(null)
  async function meta_data() {
    const token = data?.invitationToken
    const res = await fetch(
      `https://recruitmind-proctoring-production.up.railway.app/meta_info/${token}`
    )
    const meta = await res.json()
    setMetaInfo(meta)
  }

  useEffect(() => {
    meta_data()
  }, [data?.invitationToken])

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
          {metaInfo?.device_name ? (
            <span className='font-bold'>{metaInfo?.device_name}</span>
          ) : (
            <span>N/A</span>
          )}
        </div>

        <div className='flex items-center justify-between text-sm'>
          <div className='flex items-center gap-2 text-foreground'>
            <MapPin className='size-4' />
            <span>Location</span>
          </div>
          {metaInfo?.location ? (
            <span className='font-bold'>{metaInfo.location}</span>
          ) : (
            <span>{metaInfo?.location}</span>
          )}
        </div>
        <Separator className='my-2.5' />
      </div>

      <div className='mb-7 space-y-1.5 text-sm text-foreground'>
        {[
          // {
          //   label: 'Filled out only once from IP address?',
          //   Icon: Globe,
          //   value: isInterviewCompleted ? 'Yes' : 'N/A'
          // },
          {
            label: 'Webcam enabled?',
            Icon: Video,
            value: 'Yes'
          },
          // {
          //   label: 'Full-screen mode always active?',
          //   Icon: Maximize,
          //   value: isInterviewCompleted ? 'No' : 'N/A'
          // },
          {
            label: 'Mouse always in assessment window?',
            Icon: Mouse,
            value: (metaInfo?.tab_switch_count || 0) >= 0 ? 'No' : 'yes'
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
              className={cn(
                'flex h-6 items-center justify-center rounded-full px-2 text-xs',
                value === 'No' ? 'bg-red-300' : 'bg-lime-400',
                value === 'N/A' && '!-mr-2 bg-transparent text-sm'
              )}
            >
              {value}
            </span>
          </div>
        ))}
        <div className='mt-10'>
          <button className='bg-zinc-900 p-2 text-white'>
            <a
              href={`https://recruitmind-proctoring-production.up.railway.app/report/${data?.invitationToken}`}
              download
              target='_blank'
              rel='noopener noreferrer'
              className='text-white'
            >
              Download Report
            </a>
          </button>
        </div>
      </div>

      {isInterviewCompleted && (
        <div className='relative aspect-video bg-accent'>
          {/* Placeholder for video player */}
        </div>
      )}
    </>
  )
}

export default AntiCheatingMonitor
