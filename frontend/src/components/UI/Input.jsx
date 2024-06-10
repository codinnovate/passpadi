import React from 'react'

const Input = ({ onChange, placeholder, type, required }) => {
    return (
        <input
            required={required ? required : true}
            type={type ? type : 'text'}
            className='border-2 rounded border-grey p-2'
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

export default Input
