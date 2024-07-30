import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IconWrapper from '../components/UI/IconWrapper';
import ThreadsCard from '../components/ThreadsCard';
import axios from 'axios';
import { serverApp } from '../../server';
import AnimationWrapper from '../common/page-animation';
import CreateReplies from '../components/CreateReplies';
import toast from 'react-hot-toast';
import ReplyCard from './ReplyCard';
import Loader from '../components/loader.component';

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
        console.log(err)
        toast.error("Failed to fectch post at the moments.please refresh the page")
      })
    }

 useEffect(() => {
  getPost()
 }, [postId])
 if(!post) return <Loader />
  return (
    <div className='max-w-3xl mx-auto flex flex-col p-2 w-full relative '>
      <div className='fixed top-[9%] right-0 border-b justify-center   bg-white items-center w-full z-[99999]'>
       <div className='max-w-3xl mx-auto w-full flex   justify-between'>
        <IconWrapper
        link='/'
        icon="fi fi-rr-arrow-small-left"
        />
        <div className='flex items-center flex-col '>
            <h2 className='text-xl font-bold'>Asks</h2>
            <p className='text-center text-dark-grey font-semibold'>@{post?.user?.personal_info?.username}&apos;s Post</p>
        </div>
        <IconWrapper
        icon="fi fi-rr-menu-dots"
        />
        
        </div> 
        </div>

    <AnimationWrapper className='mt-[3em] flex flex-col border-b border  rounded-2xl pt-5 p-2'>
      <ThreadsCard 
          post={post}
          user={post?.user?.personal_info}
          />
      <div className='  flex flex-col'>
        <CreateReplies 
         Author={post?.user?.personal_info?.username}
         postId={postId}
         />
      </div>
      </AnimationWrapper>
      <h1 className='text-xl text-black font-semibold mt-5 underline'>Replies</h1>
      {post?.replies ? (
      <AnimationWrapper className='p-2'>
      <div className=''>
        {post?.replies?.map((reply, index) => (
          <ReplyCard
              key={index}
              reply={reply}
              postAuthor={post?.user?.personal_info.username}
              postId={postId}
              userId={reply?.user}
              />
        ))}
      </div>
      </AnimationWrapper>
       ) : (
        <Loader />
      )}
    </div>
  )
}

export default ThreadsDetail
