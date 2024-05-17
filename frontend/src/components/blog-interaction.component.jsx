import React, { useContext } from 'react'
import { BlogContext } from '../pages/blog.page'

const BlogInteraction = () => {

    let { blog: { blog_id, activity, activity: { total_likes, total_comments }, author: { personal_info: { username: author_username } } } , setBlog} = useContext(BlogContext);



    return (
        <>
            <hr className='border-grey my-2' />
            <div className="flex gap-6">
                <div className="flex gap-3 items-center">
                    <button
                    className='w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 '
                    >
                    <i className='fi fi-rr-heart'></i>
                    </button>
                    <div className="text-xl text-dark-grey">
                        {total_likes}
                    </div>
                </div>


                 <div className="flex gap-3 items-center">
                    <button
                    className='w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 '
                    >
                    <i className='fi fi-rr-comment-dots'></i>
                    </button>
                    <p className="text-xl text-dark-grey">
                        {total_comments}
                    </p>
                </div>

                <div className="flex gap-6 items-center">

                </div>


            </div>
            <hr className='border-grey my-2'/>
        </>
    )
}

export default BlogInteraction
