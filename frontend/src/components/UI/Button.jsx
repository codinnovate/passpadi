import React from 'react'

const Button = ({bgColor, onClick, textColor, title}) => {
  return (
    <button
        className={`hover:opacity-80 transition-opacity rounded-xl h-[2.3em] px-4 border-grey border-2 font-bold bg-${bgColor} text-${textColor}`}
        onClick={onClick}
      >
        {title}
      </button>
  )
}

export default Button
