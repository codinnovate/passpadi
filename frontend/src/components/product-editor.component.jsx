import React, { useContext, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation';
import defaultBanner from '../imgs/blog banner.png'
import { uploadImage } from '../common/aws';
import { Toaster, toast } from 'react-hot-toast';
import { ProductEditorContext } from '../pages/product.editor.pages';
import { UserContext } from '../App';
import Logo from './logo.component';

const ProductEditorPage = () => {
    const { product,  setproduct, setEditorState } = useContext(ProductEditorContext)
    let { userAuth: { access_token } } = useContext(UserContext)
    let { product_id } = useParams();
    let navigate = useNavigate();
   




    const handleBannerUpload = (e) => {
        let img = e.target.files[0];
        if (img) {
            let loadingToast = toast.loading("Uploading image please wait ..")
            console.log(img)
            uploadImage(img)
            .then((url) => {
                if (url) {
                    setproduct({ ...product, banner: url })
                    toast.dismiss(loadingToast);
                    toast.success("Image Uploaded sucessfully")
                }
            })
                .catch(err => {
                    toast.dismiss(loadingToast);
                    return toast.error(err);
                })
        }

    }
    const handleTitleKeyDown = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();

        }
    }
    const handleTitleChange = (e) => {
        let input = e.target;
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + "px";
        setproduct({ ...product, title: input.value })
    }

    const handleDesChange = (e) => {
        e.preventDefault();
        setproduct({...product, des:e.target.value})
    }
    const handleError = (e) => {
        let img = e.target;
        img.src = defaultBanner;
    }

    const handlePublishEvent = () => {
        if (!banner.length) {
            return toast.error("c'mon add a banner to publish it.")
        }

        if (!title.length) {
            return toast.error("Write a title to publish.")
        }
        setEditorState("publish")

    }
    const handleSaveDraft = (e) => {
            if (e.target.className.includes("disable")) {
            return;
        }
        if (!title.length) {
            return toast.error("Write product title before Saving as Draft")
        }
        if (!des.length || des.length > characterLimit) {
            return toast.error(`Write a description about your product within ${characterLimit} characters to publish`)
        }
        if (!categories.length) {
            return toast.error("Enter at least 1 category to help us rank your product")
        }
        let loadingToast = toast.loading("Saving as Draft.....");
        e.target.classList.add('disable');

        let productObj = {
        title, banner, des  ,price , categories, draft:true
                }
                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/add-product", {...productObj, id:product_id }, {
                    headers: {
                        'Authorization':`Bearer ${access_token}`
                    }
                }).then(() => {
                    e.target.classList.remove('disable');
                    toast.dismiss(loadingToast)
                    toast.success("Saved");
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
        <>
        <nav className='navbar'>
            <Logo />

            <p className='max-md:hidden text-black line-clamp-1 w-full '>
               "New product"
            </p>
            <div className='flex  gap-4 ml-auto'>
                    <button
                        onClick={handlePublishEvent}
                        className='btn-dark py-2'
                    >Publish</button>
                    <button
                        onClick={handleSaveDraft}
                        className='btn-light py-2'>Save Draft</button>
            </div>
            </nav>
            <Toaster />
        <AnimationWrapper>

                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                        <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80 ">
                            <label htmlFor='uploadBanner'>
                                <img
                                    src={defaultBanner}
                                    className='z-20'
                                    onError={handleError}
                                />
                                <input
                                    id='uploadBanner'
                                    type='file'
                                    accept='.png, .jpg, .jpeg'
                                    hidden
                                    onChange={handleBannerUpload}
                                />
                        </label>
                        </div>
                        <textarea
                            defaultValue="Product Title"
                            onKeyDown={handleTitleKeyDown}
                            onChange={handleTitleChange}
                            placeholder='product Title'
                            className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
                        >
                        </textarea>

                        <hr className='w-full opacity-10 my-5' />
                         <textarea
                            defaultValue="Product Description"
                            onChange={handleDesChange}
                            placeholder='product Description'
                            className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
                        >
                        </textarea>

                </div>
                </section>                
        </AnimationWrapper>

        </>
    )
}

export default ProductEditorPage
