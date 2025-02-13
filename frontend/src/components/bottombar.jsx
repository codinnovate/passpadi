import React from 'react'
import IconBtn from './UI/IconBtn'

const Items =  [
    {icon:"fi fi-rr-house-blank", link:"/"},
    {icon:"fi fi-rr-e-learning ", link:"/classroom"},
    {icon:"fi fi-rr-square-plus", link:"/community"},
    {icon:"fi fi-rr-money-bill-wave", link:"/pay-for-app"},
    {icon:"fi fi-rr-bells", link:"/notifications"},
]
const Bottombar = () => {
  return (
    <div className='md:hidden w-full fixed bottom-0   bg-white border-t border-grey rounded-t-[1.4em] h-[4em]'>
        <div className='flex px-[1em] w-full h-full justify-between   items-center'>
            {Items.map((item, index) => (
                <IconBtn 
                 key={index}
                 icon={item.icon}
                 link={item.link}/>
            ))}
        </div>
    </div>
  )
}

export default Bottombar