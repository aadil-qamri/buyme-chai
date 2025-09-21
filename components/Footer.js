import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='bg-blue-950 flex justify-center items-center px-4 h-16'>
      <p className='text-center'>Copyright &copy; {currentYear} Get Me a Chai - All Rights Reserved</p>
    </footer>
  )
}

export default Footer
