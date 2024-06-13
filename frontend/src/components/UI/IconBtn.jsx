import React from 'react'
import { Link } from 'react-router-dom'

const IconBtn = ({icon, link}) => {
  return (
    <Link 
    to={link}
     className='hover:bg-grey flex items-center justify-center  w-fit px-4 p-2 '>
        <i className={`${icon} text-[30px]`}></i>
    </Link>
  )
}

export default IconBtn