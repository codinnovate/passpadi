import React from 'react'

const Textarea = ({value, onChange, placeholder}) => {
    return (
         <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='input-box pl-5 placeholder:text-dark-grey   resize-none h-[100px]'
            >
        </textarea>
    )
}

export default Textarea
