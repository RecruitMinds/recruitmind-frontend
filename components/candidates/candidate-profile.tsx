'use client'

import { toast } from 'sonner'
import { Copy } from 'lucide-react'

import { getInitials } from '@/lib/utils'
import { useCandidate } from '@/data/hooks/use-candidate'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const CandidateProfile = ({ candidateId }: { candidateId: string }) => {
  const { data } = useCandidate(candidateId, {
    staleTime: Infinity,
    enabled: false
  })

  const handleCopyEmail = async () => {
    if (data?.email) {
      await navigator.clipboard.writeText(data.email)
      toast.success('Email copied to clipboard')
    }
  }

  return (
    <div className='flex items-center gap-10'>
      <div className='flex items-center gap-3'>
        <Avatar className='size-12'>
          <AvatarFallback className='bg-secondary text-xl text-foreground'>
            {getInitials(data!.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className='leading-tight tracking-tight'>
          <h2 className='text-xl font-bold text-foreground'>
            {data?.fullName} (He/Him)
          </h2>
          <div className='flex items-center text-sm text-muted-foreground'>
            <span>{data?.email}</span>
            <Button
              variant='ghost'
              size='icon'
              className='ml-1 size-4 text-foreground'
              onClick={handleCopyEmail}
              aria-label='copy'
            >
              <Copy className='size-3' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateProfile
