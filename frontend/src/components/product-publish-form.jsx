import React, { useContext } from 'react'
import AnimationWrapper from '../common/page-animation'
import { Toaster, toast } from 'react-hot-toast'
import { EditorContext } from '../pages/editor.pages'
import Tag from './tags.component';
import { UserContext } from '../App';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';






const ProductPublishForm = () => {
    let { product, product: {banner, title, categories, des, content} , setEditorState, setproduct } = useContext(EditorContext);
    let { product_id } = useParams();

    let  characterLimit = 200;
    let  tagLimit = 10;
    let navigate = useNavigate();

    let { userAuth: { access_token } } = useContext(UserContext);
    console.log(access_token)
    const handleCloseEvent = () => {
     setEditorState("editor")
    }

    const handleproductTitleChange = () => {
        let input = e.target;
        setproduct({...product, title:input.value })
    }
    const handleproductDesChange = (e) => {
        let input = e.target;
        setproduct({...product, des:input.value})

    }
    const rejectEnterKey = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
           }
    }
    const handleKeyDown = (e) => {
        if (e.keyCode == 13 || e.keyCode == 188) {
            e.preventDefault();
            let tag = e.target.value;
            if (categories.length < tagLimit) {
                if (!categories.includes(tag) && tag.length) {
                    setproduct({ ...product, categories: [...categories, tag] })
                }
            } else {
                toast.error(`You can only  add  ${tagLimit} categories max`)
            }
            e.target.value = "";
        
        }
    }


    const publishproduct = (e) => {
        if (e.target.className.includes("disable")) {
            return;
        }
        if (!title.length) {
            return toast.error("Write product title before publishing")
        }
        if (!des.length || des.length > characterLimit) {
            return toast.error(`Write a description about your product within ${characterLimit} characters to publish`)
        }
        if (!categories.length) {
            return toast.error("Enter at least 1 tag to help us rank your product")
        }
        let loadingToast = toast.loading("Publishing.....");
        e.target.classList.add('disable');
        let productObj = {
            title, banner, des , content, categories, draft:false
        }
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/add-product", {...productObj, id: product_id }, {
            headers: {
                'Authorization':`Bearer ${access_token}`
            }
        }).then(() => {
            e.target.classList.remove('disable');
            toast.dismiss(loadingToast)
            toast.success("Published cool");
            setTimeout(() => {
                navigate("/")
            }, 500)
        })
            .catch(({response }) => {
                e.target.classList.remove('disable');
                toast.dismiss(loadingToast);
                return  toast.error(response.data.error)
    
        })

    }



    return (
        <AnimationWrapper>
            <section className='w-screen min-h-screen grid items-center lg:grid-cols-2  py-16 lg:gap-4 '>
                <Toaster />

                <button
                    onClick={handleCloseEvent}
                    className='w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]'>
                    <i className='fi fi-br-cross'></i>
                </button>

                <div className='max-w-[550px] center'>
                    <p className='text-dark-grey mb-1'>Preview</p>

                    <div className='w-full aspect-video rounded-lg  overflow-hidden bg-grey mt-4 '>
                        <img src={banner} />
                    </div>
                    <h1 className='text-4xl font-medium mt-2 leading-tight line-clamp-2'>{title}</h1>
                    <p  className='font-gelasio line-clamp-2 text-xl leading-7 mt-4 '>{des}</p>
                </div>

                <div className=''>
                    <p className='text-dark-grey mb-2 mt-9 '>product Title</p>
                    <input
                        type="text"
                        placeholder='product Title'
                        defaultValue={title}
                        className='input-box pl-4 '
                        onChange={handleproductTitleChange}
                    />
                    <p className='text-dark-grey mb-2 mt-9 '>Short description about your product</p>
                    <textarea
                        maxLength={characterLimit}
                        defaultValue={des}
                        onChange={handleproductDesChange}
                        onKeyDown={rejectEnterKey}
                        className='h-40 resize-none leading-7 input-box pl-4 '
                    >
                    </textarea>
                    <p className='mt-1 text-dark-grey text-sm text-right'>{characterLimit - des.length } Characters left</p>
                    <p className='text-dark-grey mb-2 mt-9'>Categories - (Helps in searching and ranking your product  ) </p>
                    <div className='relative input-box pl-2 py-2 pb-4'>
                        <input
                            type="text"
                            placeholder='Topic'
                            onKeyDown={handleKeyDown}
                            className='sticky input-box bg-white top-0 left-0 pl-4  mb-3 focus:bg-white'
                        />

                        {
                            categories.map((tag, i) => (
                                <Tag
                                    tag={tag}
                                    key={i}tagIndex={i}
                                />
                            )
                        )}
                        </div>
                    <p className='mt-1 text-dark-grey text-sm text-right'>{tagLimit - categories.length} categories left</p>
                    
                    <button
                        onClick={publishproduct}
                        className='btn-dark px-8 '>Publish</button>
                </div>
            </section>
            
        </AnimationWrapper>
    )
}

export default ProductPublishForm
