'use client'

import { company } from '@/data/company'
import { FunctionComponent } from 'react'

const Footer: FunctionComponent = () => {
  return (
    <footer
      id='footer'
      className='bg-gray-800 text-white py-6'>
      <div className='container mx-auto text-center'>
        <p className='text-sm sm:text-base'>
          &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
