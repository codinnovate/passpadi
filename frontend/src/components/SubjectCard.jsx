import React from 'react'
import { Link } from 'react-router-dom'

const SubjectCard = ({name, id}) => {
    return (
        <div className='bg-white flex justify-center items-center ring-1 ring-purple shadow-xl w-[14em] p-3  h-[14em] rounded-xl'>
            <Link
                to={`${id}`}
                className='rounded-full bg-black/30 w-6 h-6 p-2'>
                <i class="fi fi-rr-pencil"></i>
            </Link>
            <p className='text-black  text-2xl font-semibold'>{name}</p>
            
        </div>
    )
}

export default SubjectCard
