import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InPageNavigation from '../components/inpage-navigation.component';
import AnimationWrapper from '../common/page-animation';
import BlogPostCard from '../components/blog-post.component';
import NoDataMessage from '../components/nodata.component';
import LoadMoreDataBtn from '../components/load-more.component';
import Loader from '../components/loader.component';
import filterPaginationData from '../common/filter-pagination-data';
import axios from 'axios';

const SearchPage = () => {

    let { query } = useParams();
    const [blogs, setBlog] = useState(null)


    const searchBlogs = ({ page = 1, create_new_arr = false }) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { query, page })
            .then(async ({ data }) => {
                let formateData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/search-blogs-count",
                    data_to_send: { query },
                    create_new_arr

                })
                setBlog(formateData)
            })
            .catch(err => {
                console.log(err)
            });
    }


    useEffect(() => {

        resetState();
        searchBlogs({ page: 1, create_new_arr: true });
    },[query])

    const resetState = () => {
        setBlog(null);

    };
    return (
        <section className='h-cover flex justify-center gap-10 '>
            <div className='w-full '>
                <InPageNavigation
                    routes={[`Search Results For ${query}`, "Accounts Matched"]}
                    defaultHidden={["Accounts Matched"]}
                >
                    <>
                       {
                                blogs == null ?
                                    (
                                        <Loader /> 
                                    )
                                    : 
                                    (
                                    blogs.results.length ?
                                    blogs.results.map((blog, i) => {
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
                                    : <NoDataMessage  message="No articles published" />
                                )}
                        <LoadMoreDataBtn
                            state={blogs}
                            fetchDataFunc={searchBlogs}
                        />
                    
                    </>

                </InPageNavigation>

            </div>
       </section>
    )
}

export default SearchPage
