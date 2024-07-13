import React from 'react'
import CreateThread from '../components/CreateThread'
import Threads from '../components/Threads'
import AnimationWrapper from '../common/page-animation'

const Community = () => {

  return (
    <div className='w-full max-w-5xl mx-auto'>
      <h2 className='text-xl text-center m-2'>Learning Community</h2>
      <div className='max-w-3xl mx-auto flex flex-col  rounded-3xl border-2 border-grey mt-10'>
      <AnimationWrapper>
     <CreateThread />
     <Threads />
    </AnimationWrapper>
      </div>
    </div>
  )
}

export default Community
