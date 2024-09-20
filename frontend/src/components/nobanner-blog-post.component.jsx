import React from 'react'
import { getDay } from '../common/date';
import { Link } from 'react-router-dom';


const MinimalBlogPost = ({ blog }) => {

    return (
        <Link to={`blog/${blog._id}`} className='flex gap-5 mb-4 '>
            {/* <h1 className='blog-index'>{index < 10 ? "0" + (index + 1 ) : index }</h1> */}
            <div className=''>
                 <div className='flex gap-2 items-center mb-7'>
                {/* <img src={blog.author?.personal_info?.profile_img} className='w-6 h-6 rounded-full' />
                <p className='line-clamp-1'>@{blog.author?.personal_info.username}</p>
                */}
                <p className='min-w-fit'>
                    {getDay(blog.publishedAt)}</p>
                </div>
                <h1 className='blog-title'>{blog?.title}</h1>
            </div>
        </Link>
    )
}

export default MinimalBlogPost
