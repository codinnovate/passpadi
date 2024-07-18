import React, { useEffect, useState } from 'react'
import ThreadsCard from '../components/ThreadsCard';
import axios from 'axios';
import { serverApp } from '../../server';
import toast from 'react-hot-toast';
import Loader from './loader.component';


const Threads = () => {
  const [threads, setThreads] = useState();
  const [loading, setLoading] = useState(true)


  const getPosts = async () => {
    setLoading(true);
    await axios.get(`${serverApp}/get-posts`).then((res) => {
       setThreads(res.data);
       setLoading(false)
       console.log(res.data)
     }).catch(err => {
      toast.error(err.message)
      console.log(err)
      setLoading(false);
     })
  }

  useEffect(() => {
    getPosts()
  },[])
  if(loading) return <Loader />
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
