import React from 'react'
import fullLogo from '../imgs/full-logo.png';


const Logo = () => {
    return (
        <div>
            <img
                src={fullLogo}
                className='h-8 object-contain block mx-auto select-none' />
        </div>
    )
}

export default Logo
