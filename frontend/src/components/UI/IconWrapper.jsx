import React from 'react'
import { Link } from 'react-router-dom'

const IconWrapper = ({icon, link}) => {
  return (
    <Link 
    to={link ? link : ''}
     className='hover:bg-grey w-7 h-7 flex items-center justify-center  border rounded-full'>
        <i className={`${icon} text-xl w-5 h-5`}></i>
    </Link>
  )
}

export default IconWrapper
