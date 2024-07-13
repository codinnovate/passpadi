import React from 'react'

const Avatar = ({src}) => {
  return (
    <img  
    className='w-10 h-10 rounded-full'
    src={src} 
    alt='avatar'/>
  )
}

export default Avatar
