import React from 'react'
import Logo from '../components/logo.component'
import { Link } from 'react-router-dom'
import { Whatsapp } from '../components/whatsapp'

const Footer = () => {
    return (
        <footer className='bg-grey h-[30vh] w-full mt-[23em] mb-[3em]'>
            <div className='w-full flex-col max-w-6xl mx-auto flex justify-center items-center'>
                <Logo />
                <Whatsapp />
                <h1 className='text-xl font-medium'>© 2024 Passpadi. All rights reserved.</h1>
                <div className=''>
                <h2>
                    <a href='tel:+2349018878585'>Call us: +2349018878585</a>
                </h2>
                </div>
                <Link to='/privacy' className='link'>Privacy and Policy</Link>
            </div>
        </footer>
    )
}

export default Footer
