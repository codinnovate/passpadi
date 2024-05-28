import React from 'react'
import logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link
            to='/'
            className='w-[100px] object-cover  select-none'>
            <img src={logo}
                className='w-full' />
            </Link>
       
    )
}

export default Logo
