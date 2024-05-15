import React, { useEffect, useState } from 'react'
import AnimationWrapper from '../common/page-animation'
import InPageNavigation from '../components/inpage-navigation.component'
import Loader from '../components/loader.component';
import axios from 'axios';
import BlogPostCard from '../components/blog-post.component';
import MinimalBlogPost from '../components/nobanner-blog-post.component';
import { activeTabRef } from '../components/inpage-navigation.component';

const HomePage = () => {
    const [blogs, setBlog] = useState(null);
    const [TrendingBlogs, setTrendingBlog] = useState(null);
    let [pageState, setPageState] = useState("home");



    const categories =
        ["Unilag", "LASU", "Post UTME", "Below 200", "Nursing", "Medicine and Surgery"]



    const fetchLatestBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
            .then(({ data }) => {
                setBlog(data.blogs)
            }).catch(err => {
                console.log(err)
            
        })
        
    }

    const fetchBlogsByCategory = () => {
           axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag:pageState })
            .then(({ data }) => {
                setBlog(data.blogs)
            }).catch(err => {
                console.log(err)
            
        })
    }
     const fetchTrendingBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
            .then(({ data }) => {
                setTrendingBlog(data.blogs)
            }).catch(err => {
                console.log(err)
            
        })
        
    }


    const loadBlogByCategory = (e) => {
        let category = e.target.innerText.toLowerCase();
        setBlog(null)
        if (pageState == category) {
            setPageState("home");
            return;
        } 
        setPageState(category);
    }


    useEffect(() => {
        activeTabRef.current.click();
        if (pageState == "home") {
            fetchLatestBlogs();
        } else {
            fetchBlogsByCategory();
        }
        if (!TrendingBlogs) {
            fetchTrendingBlogs();
        }

    }, [pageState])
    return (




        <AnimationWrapper>
            <section className='h-cover flex justify-center gap-10 '>
                <div className='w-full'>
                    <InPageNavigation
                        routes={[ pageState, "trending blogs"]}
                        defaultHidden={["trending blogs"]}>
                       
                        <>
                            {
                                blogs == null ? <Loader /> : 
                                    blogs.map((blog, i) => {
                                        return (
                                           
                                            <AnimationWrapper
                                                key={i}
                                                transition={{ duration: 1, delay: i * .1 }}
                                                
                                            >
                                                <BlogPostCard
                                                    content={blog}
                                                    author={blog.author.personal_info} />
                                            </AnimationWrapper>
                                        )
                                })
                            }
                        
                        </>


                    
                            {
                                TrendingBlogs == null ? <Loader /> : 
                                    TrendingBlogs.map((blog, i) => {
                                        return (
                                           
                                            <AnimationWrapper
                                                key={i}
                                                transition={{ duration: 1, delay: i * .1 }}
                                                
                                            >
                                                <MinimalBlogPost
                                                    key={i}
                                                    blog={blog}
                                                    index={i}
                                                />
                                            </AnimationWrapper>
                                        )
                                })
                            }
                        
                </InPageNavigation>
                </div>

                {/* filters and trending blogs */}



                <div className='min-w-[40%] lg:min-w-[400px] max-w-min border-1 border-grey pl-8 pt-3 max-md:hidden '>
                    <div className='flex flex-col gap-10  '>
                     
                        <div className=''>
                        <h1 className='font-medium text-xl mb-8'>Articles from all interests </h1>
                        <div className='flex flex-wrap gap-3 '>
                                {
                                    categories.map((category, i) => {
                                        return (
                                            <button
                                            onClick={loadBlogByCategory}
                                            className={"tag  " + (pageState == category ? " bg-black text-white " : " ")}
                                                key={i}>
                                            {category}
                                        </button> 
                                        )
                                    })
                            }
                        </div>
                        </div>



                    <div className=''>
                        <h1 className='font-medium text-xl mb-8'>Trending  <i className='fi fi-rr-arrow-trend-up'></i></h1>

                        {
                            TrendingBlogs == null ? <Loader /> :
                                TrendingBlogs.map((blog, i) => {
                                    return
                                    <AnimationWrapper
                                                key={i}
                                                transition={{ duration: 1, delay: i * .1 }}
                                                
                                            >
                                                <MinimalBlogPost
                                                    key={i}
                                                    blog={blog}
                                                    index={i}
                                                />
                                    </AnimationWrapper>
                                })
                        }

                        </div>
                    </div>


                </div>
            </section>
            
        </AnimationWrapper>
    )
}

export default HomePage
