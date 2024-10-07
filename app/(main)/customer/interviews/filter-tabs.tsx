const FilterTabs = () => {
  return (
    <div className='flex h-12 w-full overflow-hidden rounded-[10px] border border-muted-foreground md:w-[394px]'>
      <button className='w-full bg-primary/20 text-sm font-bold'>
        Active (1)
      </button>
      <button className='w-full border-l border-muted-foreground bg-white text-sm text-muted-foreground'>
        Inactive (0)
      </button>
      <button className='w-full border-l border-muted-foreground bg-white text-sm text-muted-foreground'>
        Archived (0)
      </button>
    </div>
  )
}

export default FilterTabs
