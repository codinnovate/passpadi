import React from 'react'
import { Link } from 'react-router-dom'

export const Whatsapp = () => {
  return (
    <Link
    to='https://wa.link/qlx683'
     className='fixed   bottom-[4em] flex right-[2em] rounded-full'>
        <i class="fi fi-brands-whatsapp animate-spin text-3xl text-[#25D366]"></i>
        <div className='bg-black flex items-center rounded-full ml-2 h-10 p-1 px-3'>
            <h2 className='text-sm text-white '>Say Hello to Us</h2>
        </div>
    </Link>
  )
}
