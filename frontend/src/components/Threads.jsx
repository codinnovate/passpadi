import React, { useEffect, useState } from 'react'
import ThreadsCard from '../components/ThreadsCard';
import axios from 'axios';
import { serverApp } from '../../server';


const Threads = () => {
  const [threads, setThreads] = useState();


  const getPosts = async () => {
    const posts = await axios.get(`${serverApp}/get-posts`)
    setThreads(posts.data);
    console.log(posts.data)
  }

  useEffect(() => {
    getPosts()
  },[])
  return (
    <div className='p-3 flex flex-col gap-3'>
        {threads && threads.map((post, index) =>(
          <ThreadsCard 
          key={index}
          post={post}
          user={post?.user?.personal_info}
          />

        ))}
    </div>
  )
}

export default Threads
