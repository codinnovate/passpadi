import React from 'react'
import pageNotFoundImage from '../imgs/404.png'
import { Link } from 'react-router-dom'
import Logo from '../components/logo.component'




const PageNotFound = () => {
    return (
        <section className='h-cover relative p-10 flex flex-col items-center gap-20 text-center'>
            <img src={pageNotFoundImage} className='select-none border-2 border-grey w-72 aspect-square ' />
            <h1 className='text-4xl font-gelasio leading-7 -mt-8'>Page not Found</h1>
            <p>The page you are looking for does not exist . Head back to the 
                <Link to='/' className='text-dark underline'> Home Page</Link>
            </p>

            <div className='mt-auto'>
                <Logo />
                <p className='mt-5 text-dark-grey'>Read millions of articles about schools and education in general</p>
            </div>
        </section>
    )
}

export default PageNotFound
