import React, { createContext, useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import AnimationWrapper from '../common/page-animation';
import Loader from '../components/loader.component';
import { getDay } from '../common/date';
import BlogInteraction from '../components/blog-interaction.component';
import BlogPostCard from '../components/blog-post.component';
import BlogContent from '../components/blog-content.component';
import CommentsContainer, { fetchComments } from '../components/comments.component';



export const blogStructure = {
    title: "",
    des: "",
    content: "",
    author: { personal_info: {} },
    banner: '',
    publishedAt:"",
    
}

export const BlogContext = createContext({})

const BlogPage = () => {

    let { blogId } = useParams();
    const [loading, setLoading ] = useState(true)
    const [blog, setBlog] = useState(blogStructure);
    const [similarBlogs, setSimilarBlogs ] = useState(null)
    let { title, content, banner, author: { personal_info: { fullname, username:author_username, profile_img } }, publishedAt, } = blog;
    const [isLikedByUser, setLikedByUser] = useState(false);
    const [commentsWrapper, setCommentsWrapper] = useState(false);
    const [totalParentCommentsLoaded, setTotalParentCommentsLoaded] = useState(0);




    const fetchBlog = () => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", {
            blog_id:blogId,
        })
            .then(async ({ data: { blog } }) => {
            blog.comments = await fetchComments({blog_id: blog._id, setParentCommentCountFun: setTotalParentCommentsLoaded})
                console.log("before" + blog)
                setBlog(blog);
                console.log("after" + blog)
                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "search-blogs", { tag: blog.tags[0], limit: 6, eliminate_blog:blogId })
                    .then(({ data }) => {
                        setSimilarBlogs(data.blogs);
                    
                })
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }


    useEffect(() => {
        resetStates();
        fetchBlog();
    }, [blogId])
    
    const resetStates = () => {
        setBlog(blogStructure)
        setSimilarBlogs(null);
        setLoading(true);
        setLikedByUser(false);
        setCommentsWrapper(false);
        setTotalParentCommentsLoaded(0)
    }

    return (
        <AnimationWrapper>
            {
                loading ? <Loader />
                    : 
                    <BlogContext.Provider value={{ blog, setBlog, isLikedByUser, setLikedByUser, commentsWrapper, setCommentsWrapper, totalParentCommentsLoaded, setTotalParentCommentsLoaded }}>
                    {/* <CommentsContainer /> */}
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
                                        @
                                        <Link to={`/user/${author_username}`} className='underline'>
                                        {author_username}
                                        </Link>
                                    </p>
                                </div>
                                <p className='text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5 '>Published on {getDay(publishedAt)}</p>
                            </div>
                        </div>
                        <BlogInteraction />  
                            <div className='my-12 font-gelasio blog-page-content'>
                                {
                                    content[0].blocks?.map((block, i) => {
                                        return (
                                        <div
                                            key={i}
                                            className='my-4 md:my-8 '>
                                            <BlogContent block={block}  />
                                        </div>
                                        )})
                                }
                            </div>
                            {/* Blog content  will go over here soon */}
                            <BlogInteraction />
                            {
                                similarBlogs != null && similarBlogs.length ? 
                                    <>
                                        <h1 className='text-2xl mt-14 mb-10 font-medium'>Similar bogs</h1>
                                        
                                        {
                                            similarBlogs.map((blog, i) => {
                                                let { author: { personal_info }  } = blog;
                                                return 
                                                <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.08 }}>
                                                    <BlogPostCard content={blog} author={personal_info}  />
                                                    
                                                    </AnimationWrapper>
                                                
                                            })
                                        }
                                    </>
                                : ""
                            }

                    </div>
            </BlogContext.Provider>
            }
        </AnimationWrapper>
    )
}

export default BlogPage
