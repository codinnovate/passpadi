import React from 'react'

const Button = ({bgColor, onClick, className, textColor, title, width, hover}) => {
  return (
    <button
        className={`hover:opacity-80 select-none ${className} hover:${hover} transition-opacity rounded-xl h-[2.3em] px-4 border-grey border-2 font-bold w-${width ? width : 'full'} bg-${bgColor} text-${textColor}`}
        onClick={onClick}
      >
        {title}
      </button>
  )
}

export default Button
