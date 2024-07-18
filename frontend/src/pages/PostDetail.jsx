import React from 'react'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
    const {postId} = useParams();
  return (
    <div>
      <h1>Post detail</h1>
      {postId}
      <div className='max-w-3xl mx-auto flex flex-col  rounded-3xl border-2 border-grey mt-10'>
    <AnimationWrapper>
     <CreateThread />
     <Threads />
    </AnimationWrapper>
      </div>
    </div>
  )
}

export default PostDetail
