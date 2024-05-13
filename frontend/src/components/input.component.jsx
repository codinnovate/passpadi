import React, { useState } from 'react'

const InputBox = ({name, type, id, value, placeholder, icon}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);


    return (
        <div className='relative w-full mb-4'>
            <input
                name={name}
                type={type == "password" ? passwordVisible ? "text" : "password" : type}
                defaultValue={value}
                placeholder={placeholder}
                id={id}
                className='input-box'
            />
            <i className={`fi  input-icon ${icon} `}></i>
            {
                type == "password" ?
                    <i  onClick={() => setPasswordVisible(!passwordVisible)}
                        className={` fi ${passwordVisible ? "fi-rr-eye" : "fi-rr-eye-crossed" }  input-icon left-auto right-4 cursor-pointer `}></i> :
                    ""
            }
        </div>
    )
}

export default InputBox
