import React from 'react'
import { Link } from 'react-router-dom'

const IconWrapper = ({icon, link}) => {
  return (
    <Link 
    to={link ? link : ''}
     className='hover:bg-grey w-10 h-10 flex items-center justify-center  border rounded-full'>
        <i className={`${icon} text-2xl text-center w-8 h-8 `}></i>
    </Link>
  )
}

export default IconWrapper
