import { Download, HelpCircle, Mail, Star, UserX } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'

const InterviewHeader = () => {
  return (
    <CardTitle className='flex items-center justify-between'>
      <div className='flex flex-col items-start gap-2'>
        <div className='flex items-center gap-5 text-xl'>
          <strong>Interview</strong>
          <span className='font-normal'>
            .NET Developer - Sri Lanka - Remote
          </span>
        </div>
        <div className='flex items-center'>
          {[...Array(4)].map((_, i) => (
            <Star key={i} className='size-5 fill-current text-primary' />
          ))}
          <Star className='size-5 fill-current text-input' />
        </div>
      </div>

      <div className='flex items-center gap-2'>
        {[HelpCircle, Download, Mail, UserX].map((Icon, i) => (
          <Button
            key={i}
            variant='outline'
            size='rounded'
            className='group/icon border-accent-foreground px-3.5'
          >
            <Icon
              className={cn(
                'size-5 stroke-2',
                (i == 0 || i == 2) &&
                  'group-hover/icon:fill-current group-hover/icon:stroke-white',
                i == 3 && 'group-hover/icon:fill-current'
              )}
            />
          </Button>
        ))}
      </div>
    </CardTitle>
  )
}

export default InterviewHeader
