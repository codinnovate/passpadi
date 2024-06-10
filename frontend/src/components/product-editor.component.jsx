import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate,Navigate } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation';
import defaultBanner from '../imgs/blog banner.png'
import { uploadImage } from '../common/aws';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../App';
import Logo from './logo.component';
import Input from '../components/UI/Input';
import { serverApp } from '../../server';
import axios from 'axios';



const ProductEditorPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState('');
  let { userAuth: { access_token } } = useContext(UserContext)
  let navigate = useNavigate();
   
    const handleBannerUpload = (e) => {
        let img = e.target.files[0];
        if (img) {
            let loadingToast = toast.loading("Uploading image please wait ..")
            uploadImage(img)
                .then((url) => {
                    if (url) {
                        console.log(url)
                        setBanner(url)
                        toast.dismiss(loadingToast);
                        toast.success("Image Uploaded sucessfully")
                    } else {
                        alert("No Url Ooo")
                    }
            })
                .catch(err => {
                    toast.dismiss(loadingToast);
                    return toast.error(err);
                })
        }

    }



    const handlePublishEvent = async (e) => {
         if (!banner.length) {
            return toast.error("c'mon add a banner to publish it.")
        }

        if (!name.length) {
            return toast.error("add  product name to publish.")
        }
        if (!price.length) {
            return toast.error("Write a price to publish.")
        }

         if (!description.length) {
            return toast.error("Write a description to publish.")
        }
        await axios.post(serverApp + '/add-product', {  name, price, banner, description },
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        )
            .then(res => {
                console.log(res)
                toast.success(res)
                navigate('/store')
            })
            .catch(err => {
                console.log(err)
                toast.error(err)
        })

    }
    

    return access_token === null ? <Navigate to='/signin' /> : (
        <>
        <nav className='navbar'>
            <Logo />

            <div className='flex  gap-4 ml-auto'>
                    <button
                        onClick={handlePublishEvent}
                        className='btn-dark py-2'
                    >Publish</button>
                    </div>
            </nav>
            <Toaster />
        <AnimationWrapper>

                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                        <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80 ">
                            <label htmlFor='uploadBanner'>
                                {banner ? (
                                    <img
                                src={banner}
                                className='z-20'
                                />): 
                                <img
                                src={defaultBanner}
                                className='z-20'
                                />
                            }
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='product Title'
                            className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
                        >
                        </textarea>
                        <div className='flex flex-col w-full gap-2'>
                        <h1 className='font-semibold text-xl'>Enter price</h1>
                            <Input
                            placeholder="Enter Price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            />
                            
                            </div>

                        <hr className='w-full opacity-10 my-5' />
                         <textarea
                           value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='product Description'
                            className='text-xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
                        >
                        </textarea>

                </div>
                </section>                
        </AnimationWrapper>

        </>
    )
}

export default ProductEditorPage
