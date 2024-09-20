import React, { useEffect, useState } from 'react'
import AnimationWrapper from '../common/page-animation'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getDay } from '../common/date';

const HomePage = () => {
    const [blogs, setBlog] = useState([]);



    const categories =
        ["Unilag", "LASU", "Post UTME", "Below 200", "Nursing", "Medicine and Surgery", "Jamb"]



    const fetchLatestBlogs = async ({ page = 1 }) => {
            try {
                const data = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", {page})
                 console.log(data.data)    
                 setBlog(data?.data)
                
            } catch (error) {
                console.error(error)
            }

        
            
            
       
        
    }


    useEffect(() => {
        fetchLatestBlogs({ page:1 });
        
        

    }, [])
    return (




        <AnimationWrapper>
            <section className='h-cover flex justify-center gap-10 '>
               

                {/* filters and trending blogs */}



                <div className='min-w-[40%] lg:min-w-[400px] max-w-min border-1 border-grey pl-8 pt-3 max-md:hidden '>
                    <div className='flex flex-col gap-10  '>
                     
                       
                    <div className=''>
                        <h1 className='font-medium text-xl mb-8'>Trending  <i className='fi fi-rr-arrow-trend-up'></i></h1>

                       {blogs && blogs.map((blog, index) => (
                        <Link to={`/blog/${blog.blog_id}`} className='flex gap-5 mb-4 '>
                        {/* <h1 className='blog-index'>{index < 10 ? "0" + (index + 1 ) : index }</h1> */}
                        <div className=''>
                             <div className='flex gap-2 items-center mb-7'>
                            <img src={blog?.author?.personal_info?.profile_img} className='w-6 h-6 rounded-full' />
                            <p className='line-clamp-1'>@{blog?.author?.personal_info.username}</p>
                           
                            <p className='min-w-fit'>
                                {getDay(blog.publishedAt)}</p>
                            </div>
                            <h1 className='blog-title'>{blog?.title}</h1>
                        </div>
                    </Link>))}

                        </div>
                    </div>

                    
                </div>
                    </section>
                    
        </AnimationWrapper>
    )
}

export default HomePage
