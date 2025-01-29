import { MouseEventHandler } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AlertConfirmationProps {
  children: React.ReactNode
  onConfirm: MouseEventHandler<HTMLButtonElement> | undefined
  title: string
  description: string
  confirmText?: string
  cancelText?: string
}

export function AlertConfirmation({
  children,
  onConfirm,
  title,
  description,
  confirmText = 'Delete',
  cancelText = 'Cancel'
}: AlertConfirmationProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        onClick={e => e.stopPropagation()}
        className='max-w-2xl'
      >
        <AlertDialogHeader className='space-y-5'>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className='font-normal text-foreground'>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='sm:space-x-3'>
          <AlertDialogCancel
            onClick={e => e.stopPropagation()}
            className={cn(
              buttonVariants({ size: 'rounded', variant: 'outline' }),
              'font-normal'
            )}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={buttonVariants({ size: 'rounded' })}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
