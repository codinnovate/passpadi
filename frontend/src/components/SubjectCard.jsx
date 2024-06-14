import React from 'react'
import { Link } from 'react-router-dom'

const SubjectCard = ({name, id}) => {
    return (
        <div className='bg-white flex justify-center items-center ring-1 ring-grey shadow-xl w-[14em] p-3  rounded-xl'>
            <Link
                to={`${id}`}
                className='rounded-full bg-black/30 w-6 h-6 p-2'>
                <i class="fi fi-rr-pencil"></i>
            </Link>
            <h1 className='text-black  text-2xl'>{name}</h1>
            
        </div>
    )
}

export default SubjectCard
