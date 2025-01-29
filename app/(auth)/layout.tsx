const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex grow items-center justify-center bg-[#fffaf6] p-8'>
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
