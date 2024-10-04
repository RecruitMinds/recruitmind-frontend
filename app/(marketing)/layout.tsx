import React from 'react'

import Footer from './footer'
import Header from './header'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='grow bg-secondary'>{children}</main>
      <Footer />
    </div>
  )
}

export default MarketingLayout
