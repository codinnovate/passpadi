import React from 'react'
import Logo from '../components/logo.component'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-grey h-[30vh] w-full mt-[23em] '>
            <div className='w-full flex-col max-w-6xl mx-auto flex justify-center items-center'>
                <Logo />
                <h1 className='text-xl font-medium'>© 2024 Passpadi. All rights reserved.</h1>
                <Link to='/privacy' className='link'>Privacy and Policy</Link>
            </div>
        </footer>
    )
}

export default Footer
