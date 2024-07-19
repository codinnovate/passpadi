import React, { useContext, useState } from 'react';
import Avatar from './Avatar';
import { UserContext } from '../App';
import axios from 'axios';
import { serverApp } from '../../server';
import toast, { Toaster } from 'react-hot-toast';
import { uploadImage } from '../common/aws';

const CreateReplies = ({Author, postId}) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const { userAuth, userAuth: { access_token, profile_img } } = useContext(UserContext);

  const handleBannerUpload = (e) => {
    let img = e.target.files[0];
    if (img) {
      let loadingToast = toast.loading("Uploading image please wait ..")
      uploadImage(img)
        .then((url) => {
          if (url) {
            setImage(url);
            toast.dismiss(loadingToast);
            toast.success("Image Uploaded successfully");
          }
        })
        .catch(err => {
          toast.dismiss(loadingToast);
          toast.error(err.message);
        });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!access_token) {
      toast.error("Please Login Again!!");
      return;
    }

    if(!content && !image){
      toast.error("Please write something or choose an image!!")
    }
    await axios.put(`${serverApp}/reply/${postId}/`, {
      content,
      image,
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(() => {
      toast.success("Post created successfully!");
      window.location.reload();
      setImage(null);
      setContent(null);
    }).catch(err => {
      toast.error(err.message);
      toast.error('Something went wrong!!, Try Again');
    });
  };

  return (
    <div className='flex flex-col p-4 w-full '>
      <Toaster />
      <div className='flex w-full'>
        <Avatar src={profile_img} />
        <div className='flex w-full flex-col ml-3'>
          <input
            placeholder={`Reply @${Author}`}
            className='border-none w-full outline-none font-medium'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className='flex flex-start'
            onClick={() => document.getElementById('fileInput').click()}
          >
            <i className="fi fi-rr-picture"></i>
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleBannerUpload}
          />
        </div>
      <button
        className='rounded-xl h-[2.3em] px-4 border-grey border-2 font-bold hover:bg-grey transition-all'
        onClick={handleUpload}
      >
        Reply
      </button>
      </div>


      {image && (
        <div className='flex mt-10 relative border rounded-2xl w-[300px] max-h-[400px]'>
          <button
          onClick={() => setImage(null)}
           className='absolute right-0 top-0 m-4 bg-red text-white p-2 w-9 h-9 rounded-md'>
          <i className="fi fi-br-cross text-sm"></i>
          </button>
          <img src={image} className='w-[300px] h-[400px]' alt='image'/>
        </div>
      )}
    </div>
  );
};

export default CreateReplies;


{/* <ReactQuill
 theme="snow" 
 modules={modules}
 value={content}
 onChange={setContent}
    />   */}