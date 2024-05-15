import React, { useContext, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../imgs/logo.png';
import AnimationWrapper from '../common/page-animation';
import defaultBanner from '../imgs/blog banner.png'
import { uploadImage } from '../common/aws';
import { Toaster, toast } from 'react-hot-toast';
import { EditorContext } from '../pages/editor.pages';
import Editorjs from "@editorjs/editorjs";
import { tools } from './tools.component';
import { UserContext } from '../App';

const BlogEditor = () => {
    let { blog, blog: { title, banner, content, tags, des }, setBlog, textEditor, setTextEditor, setEditorState } = useContext(EditorContext)
    let { userAuth: { access_token } } = useContext(UserContext)
    let navigate = useNavigate();
    useEffect(() => {
        if (!textEditor.isReady) {
            setTextEditor(new Editorjs({
                holder: "editorjs",
                data: content,
                tools: tools,
                placeholder: "Let's write an awesome article"
            }))

        }
    }, [])
    const handleBannerUpload = (e) => {
        let img = e.target.files[0];
        if (img) {
            let loadingToast = toast.loading("Uploading image please wait ..")
            uploadImage(img).then((url) => {
                if (url) {
                    setBlog({ ...blog, banner: url })
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
        setBlog({ ...blog, title: input.value })
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

        if (textEditor.isReady) {
            textEditor.save().then(data => {
                if (data.blocks.length) {
                    setBlog({ ...blog, content: data });
                    setEditorState("publish")
                } else {
                    return toast.error("Write something first  ")
                }
            })
        }
    }
    const handleSaveDraft = (e) => {
            if (e.target.className.includes("disable")) {
            return;
        }
        if (!title.length) {
            return toast.error("Write blog title before Saving as Draft")
        }
        if (!des.length || des.length > characterLimit) {
            return toast.error(`Write a description about your blog within ${characterLimit} characters to publish`)
        }
        if (!tags.length) {
            return toast.error("Enter at least 1 tag to help us rank your blog")
        }
        let loadingToast = toast.loading("Saving as Draft.....");
        e.target.classList.add('disable');

        if (textEditor.isReady) {
            textEditor.save().then(content => {
                let blogObj = {
                    title, banner, des , content, tags, draft:true
                }
                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", blogObj, {
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
            })
        }

    }

    return (
        <>
        <nav className='navbar'>
            <Link to="/" className='flex-none w-10'>
                <img src={logo} />
            </Link>

            <p className='max-md:hidden text-black line-clamp-1 w-full '>
               {title ? title : "New Blog"} 
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
                                    src={banner}
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
                            defaultValue={title}
                            onKeyDown={handleTitleKeyDown}
                            onChange={handleTitleChange}
                            placeholder='Blog Title'
                            className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
                        >
                        </textarea>

                        <hr className='w-full opacity-10 my-5' />
                        <div id='editorjs' className='font-gelasio'></div>

                </div>
                </section>                
        </AnimationWrapper>

        </>
    )
}

export default BlogEditor
