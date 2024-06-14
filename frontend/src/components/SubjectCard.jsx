import React from 'react'
import { Link } from 'react-router-dom'

const SubjectCard = ({name, id}) => {
    return (
        <Link
        to={`${id}`}
        className='bg-white flex justify-center items-center ring-1 ring-grey shadow-xl w-[14em] p-3  rounded-xl'>
            <h1 className='text-black   text-2xl'>{name}</h1>
            </Link>
            
    )
}

export default SubjectCard
