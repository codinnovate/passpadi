
import React from 'react'

import { Link} from 'react-router-dom';

const SubCard = ({image, text, link, bgColor}) => {
  return (
    <Link
     to = {`${link}`}
     className={`${bgColor} hover:opacity-8 w-full rounded-2xl h-[170px] flex items-center  p-2 flex-col`  }>
      <img
       src={image} 
       className='w-[100px] object-contain'
      />
      <h1 className="text-xl font-bold text-green">{text}</h1>
    </Link>
  )
}


export default SubCard