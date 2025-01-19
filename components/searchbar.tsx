import React from 'react'
import { Search } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

const SearchBar = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, placeholder, ...props }, ref) => {
  return (
    <div className='relative w-full flex-1'>
      <Search className='absolute left-4 top-3.5 size-5 text-muted-foreground' />
      <Input
        type='search'
        placeholder={placeholder}
        className={cn(
          'h-12 w-full rounded-[10px] border-muted-foreground bg-background pl-12 text-xs focus-visible:ring-black',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar
