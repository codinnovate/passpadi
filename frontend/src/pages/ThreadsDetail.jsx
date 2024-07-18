import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import IconBtn from '../components/UI/IconBtn';
import IconWrapper from '../components/UI/IconWrapper';

const ThreadsDetail = () => {
    const [post, setPost ] = useState('');
    const {postId} = useParams();


    
  return (
    <div className='max-w-3xl mx-auto flex flex-col p-2 w-full'>
      <div className='flex justify-between items-center w-full'>
        <IconWrapper
        icon="fi fi-rr-arrow-small-left"
        />
        <div className=''>
            <h2 className='text-xl font-bold'>Thread</h2>
            <p className='text-center text-dark-grey font-semibold'>2.3K views</p>
        </div>
        <IconWrapper
        icon="fi fi-rr-menu-dots"
        />
        </div>
        <div className=''>
        <ThreadsCard 
          key={index}
          post={post}
          user={post?.user?.personal_info}
          />
        </div>
    </div>
  )
}

export default ThreadsDetail
