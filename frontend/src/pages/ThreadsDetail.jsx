import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IconBtn from '../components/UI/IconBtn';
import IconWrapper from '../components/UI/IconWrapper';
import ThreadsCard from '../components/ThreadsCard';
import axios from 'axios';
import { serverApp } from '../../server';
import AnimationWrapper from '../common/page-animation';

const ThreadsDetail = () => {
    const [post, setPost ] = useState('');
    const {postId} = useParams();

    const getPost = async () => {
      await axios.get(serverApp + `/post/${postId}`)
      .then((res) => {
        console.log(res.data)
        setPost(res.data)
      })
      .catch((err) => {
        console.log(err.message)
        toast.error("Failed to fectch post at the moments.please refresh the page")
      })
    }

 useEffect(() => {
  getPost()
 }, [postId])
  return (
    <div className='max-w-3xl mx-auto flex flex-col p-2 w-full relative'>
      <div className='fixed top-[12%] flex  bg-white border-b justify-between items-center w-full z-[99999]'>
        <IconWrapper
        link='/community'
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

    <AnimationWrapper className='mt-[3em] border rounded-t-2xl pt-5 p-2'>
      <ThreadsCard 
          post={post}
          user={post?.user?.personal_info}
          />
      </AnimationWrapper>
      <div className='border-b p-2'>
        <h1 className='text-xl text-black font-semibold'>Replies</h1>
      </div>
      <AnimationWrapper className='p-2'>
      <ThreadsCard 
          post={post?.replies}
          user={post?.resplies?.user?.personal_info}
          />
      </AnimationWrapper>
    </div>
  )
}

export default ThreadsDetail
