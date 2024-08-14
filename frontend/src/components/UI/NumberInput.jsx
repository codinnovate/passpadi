import React from 'react'

const NumberInput = ({onChange, value}) => {
  return (
    <input
    type="number"
    className={`hover:opacity-80 transition-opacity rounded-xl h-[2.5em] px-4 border-grey border-2 font-bold w-full`}
    value={value}
    onChange={onChange}
  />
  )
}

export default NumberInput
