const Footer = () => {
  return (
    <footer className='py-4'>
      <div className='container text-center text-sm text-muted-foreground'>
        <p>
          RecruitMind &copy;{new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
