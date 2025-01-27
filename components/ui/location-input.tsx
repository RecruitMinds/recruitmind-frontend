import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Import JSON data directly
import countries from '@/data/countries.json'
import { CaretSortIcon } from '@radix-ui/react-icons'

interface Timezone {
  zoneName: string
  gmtOffset: number
  gmtOffsetName: string
  abbreviation: string
  tzName: string
}

interface CountryProps {
  id: number
  name: string
  iso3: string
  iso2: string
  numeric_code: string
  phone_code: string
  capital: string
  currency: string
  currency_name: string
  currency_symbol: string
  tld: string
  native: string
  region: string
  region_id: string
  subregion: string
  subregion_id: string
  nationality: string
  timezones: Timezone[]
  translations: Record<string, string>
  latitude: string
  longitude: string
  emoji: string
  emojiU: string
}

interface LocationSelectorProps {
  disabled?: boolean
  onCountryChange?: (country: CountryProps | null) => void
  placeholder: string
  defaultValue?: string | null
  className?: string
}

const LocationSelector = ({
  disabled,
  onCountryChange,
  placeholder,
  defaultValue,
  className
}: LocationSelectorProps) => {
  // Cast imported JSON data to their respective types
  const countriesData = countries as CountryProps[]

  const [selectedCountry, setSelectedCountry] = useState<CountryProps | null>(
    defaultValue
      ? (countriesData.find(c => c.name === defaultValue) as CountryProps)
      : null
  )
  const [openCountryDropdown, setOpenCountryDropdown] = useState(false)

  const handleCountrySelect = (country: CountryProps | null) => {
    setSelectedCountry(country)
    onCountryChange?.(country)
  }

  return (
    <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
      <PopoverTrigger
        asChild
        className={cn(
          'h-12 w-full rounded-[10px] border-muted-foreground bg-background text-sm focus-visible:ring-black',
          className
        )}
      >
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={openCountryDropdown}
          disabled={disabled}
          className='w-full justify-between'
        >
          {selectedCountry ? (
            <div className='flex items-center gap-2'>
              <span>{selectedCountry.emoji}</span>
              <span>{selectedCountry.name}</span>
            </div>
          ) : (
            <span className='text-muted-foreground'>{placeholder}</span>
          )}
          <CaretSortIcon className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
        <Command>
          <CommandInput placeholder='Search country...' />
          <CommandList className='overflow-hidden'>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className='h-[300px]'>
                {countriesData.map(country => (
                  <CommandItem
                    key={country.id}
                    value={country.name}
                    onSelect={() => {
                      handleCountrySelect(country)
                      setOpenCountryDropdown(false)
                    }}
                    className='flex cursor-pointer items-center justify-between text-sm'
                  >
                    <div className='flex items-center gap-2'>
                      <span>{country.emoji}</span>
                      <span>{country.name}</span>
                    </div>
                    <Check
                      className={cn(
                        'h-4 w-4',
                        selectedCountry?.id === country.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
                <ScrollBar orientation='vertical' />
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default LocationSelector
