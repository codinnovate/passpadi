import React from 'react'
import IconBtn from './UI/IconBtn'

const Items =  [
    {icon:"fi fi-rr-house-blank", link:"/"},
    {icon:"fi fi-rr-e-learning ", link:"/classroom"},
    {icon:"fi fi-rr-square-plus", link:"/"},
    {icon:"fi fi-rr-store-alt", link:"/store"},
    {icon:"fi fi-rr-money-bill-wave", link:"/purchase-points"},
]
const Bottombar = () => {
  return (
    <div className='md:hidden w-full fixed bottom-0   bg-white border-t border-grey rounded-t-[1.4em] h-[4em]'>
        <div className='flex px-[1em] w-full h-full justify-between   items-center'>
            {Items.map(item => (
                <IconBtn 
                 key={item.icon}
                 icon={item.icon}
                 link={item.link}/>
            ))}
        </div>
    </div>
  )
}

export default Bottombar