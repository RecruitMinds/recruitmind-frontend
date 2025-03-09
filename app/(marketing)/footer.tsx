const Footer = () => {
  return (
    <footer className='border-t border-gray-200 py-10'>
      <div className='container text-center text-sm text-muted-foreground'>
        <p>
          &copy; {new Date().getFullYear()} RecruitMind. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
