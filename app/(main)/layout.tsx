import Header from '@/components/header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='grow bg-secondary'>{children}</main>
      <footer className='h-[60px] border-t'></footer>
    </div>
  )
}

export default MainLayout
