import React from 'react'

const Input = ({onChange, placeholder, text}) => {
    return (
        <input
            className='border-2 rounded border-grey p-2'
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

export default Input
