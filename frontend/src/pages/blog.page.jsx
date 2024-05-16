import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import AnimationWrapper from '../common/page-animation';
import Loader from '../components/loader.component';



export const blogStructure = {
    title: "",
    des: "",
    content: "",
    tags: [],
    author: { personal_info: {} },
    banner: '',
    publishedAt:"",
    
}

const BlogPage = () => {

    let { blog_id } = useParams();
    const [loading, setLoading ] = useState(true)
    const [blog, setBlog] = useState(blogStructure);
    let { title, content, banner, author: { personal_info: { fullname, username, profile_img } }, publishedAt } = blog;
    
    const fetchBlog = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", {
            blog_id,
        })
        .then(({ data: { blog } }) => {
            setBlog(blog);
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }


    useEffect(() => {
        fetchBlog();
    },[])

    return (
        <AnimationWrapper>
            {
                loading ? <Loader />
                    : 
                    <div className='max-w-[900px] center py-10 max-lg:px-[5vw] '>
                        <img src={banner} className='aspect-video ' />
                        <div className='mt-12'>
                            <h2>{title} </h2>
                            <div className='flex max-sm:flex-col justify-between my-8'>
                                <div className='flex gap-5 items-start '>
                                    <img src={profile_img} className='w-12 h-12 rounded-full' />
                                    
                                    <p>
                                        {fullname}
                                        <br />
                                        <Link>
                                        {}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
            }
        </AnimationWrapper>
    )
}

export default BlogPage
