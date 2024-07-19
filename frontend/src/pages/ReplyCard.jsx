import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import { serverApp } from '../../server';
import toast, { Toaster } from 'react-hot-toast';
import { uploadImage } from '../common/aws';
import Avatar from '../components/Avatar';
import Button from '../components/UI/Button';
const Threadstools = ({ value, icon, onClick, active }) => {
  return (
    <div className='flex items-center gap-1 cursor-pointer' onClick={onClick}>
      <i className={`fi fi-rr-${icon} text-xl ${active ? 'text-red' : ''}`}></i>
      {value && (
        <p className='font-semibold text-sm'>{value}</p>
      )}
    </div>
  );
};

const ReplyCard = ({ reply, postId, postAuthor}) => {
  const [user, setUser] = useState();
  const [showMore, setShowMore] = useState(false);
  const { userAuth, userAuth: { access_token, profile_img, fullname, username } } = useContext(UserContext);
  const [showBigImage, setShowBigImage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply?.content);
  const [editedImage, setEditedImage] = useState(reply?.image);


  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl);
    toast.success("Link copied to clipboard!");
    setShowMore(false)
  };

  const handleBannerUpload = (e) => {
    let img = e.target.files[0];
    if (img) {
      let loadingToast = toast.loading("Uploading image please wait ..")
      uploadImage(img)
        .then((url) => {
          if (url) {
            setEditedImage(url);
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

 

  const handleSavePost = async () => {
    try {
      await axios.post(`${serverApp}/save-post`, { postId }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      toast.success("Post saved successfully!");
    } catch (error) {
      toast.error("Failed to save the post");
      console.error(error);
    }
  };

  const handleReportPost = async () => {
    try {
      await axios.post(`${serverApp}/report-post`, { postId }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      toast.success("Post reported successfully!");
      setShowMore(false)

    } catch (error) {
      toast.error("Failed to report the post");
      console.error(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${serverApp}/reply/${postId}/${reply?._id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      toast.success("Post deleted successfully!");
      setShowMore(false)

      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete the post");
      console.error(error);
    }
  };

  const handleEditPost = () => {
    setShowMore(false);
    setIsEditing(true);
    setEditedContent(reply?.content);
    setEditedImage(reply?.image);
  };
  const handleBlur = () => {
        setShowMore(false);
    }
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${serverApp}/reply/${postId}/${reply?._id}`, {
        postId,
        content: editedContent,
        image: editedImage,
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      if (response.status === 200) {
        toast.success("Post updated successfully!");
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to update the Reply");
      console.error(error);
    }
  };

  const Moretools = ({ text, icon, color, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-between px-3 py-1 rounded-xl w-full cursor-pointer hover:bg-black/5 ${color}`}>
        <h2 className='text-xl font-semibold '>{text}</h2>
        <i className={`fi fi-rr-${icon} text-xl`}></i>
      </button>
    );
  };
  const getMe = async () => {
    try {
        await axios.get(serverApp + '/profile', {
            headers:{
                Authorization:`Bearer ${access_token}`
            },
        }).then((res) => {
           setUser(res.data.user.personal_info)
        })
    } catch (error) {
        console.log(error)
    }

}  
  useEffect(() => {
    if(access_token){
        getMe();
         }
 }, [access_token])
  return (
    <div
    className='flex border-b border-grey relative py-2'>
      <Toaster />
      {showBigImage && (
        <div className='bg-black fixed w-full min-h-full overflow-hidden top-0 left-0 right-0 bottom-0 z-[9999]'>
          <button
            onClick={() => setShowBigImage(false)}
            className='bg-white absolute p-4 rounded-full m-5'>
            <i className="fi fi-br-cross text-center"></i>
          </button>
          <img
            onClick={() => setShowBigImage(false)}
            src={post.image}
            alt='post Image'
            className='w-full h-full object-contain transition-all duration-150'
          />
        </div>
      )}
      <Avatar src={user?.profile_img} />
      <div className='flex flex-col w-full ml-2'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex'>
            <h2 className='text-sm capitalize'>{user?.fullname}</h2>
            <h2 className='text-sm font-medium text-dark-grey ml-2'>@{user?.username}</h2>
          </div>
          <button className="relative hover:bg-grey w-8 h-8 rounded-full flex items-center justify-center"
            onClick={() => {
                setShowMore(!showMore)
                }}>
            <i className="fi fi-sr-menu-dots"></i>
          </button>
          {showMore && (
            <div
             onBlur={handleBlur}
             className='absolute rounded-3xl w-[12em] gap-2 flex flex-col h-fit p-3 top-0 mt-8 right-0 border bg-white z-50'>
              <Moretools text="Save" icon="bookmark" onClick={handleSavePost} />
              <Moretools text="Report" icon="hexagon-exclamation" color="text-red" onClick={handleReportPost} />
              {user?.username === username && (
                <>
                  <Moretools text="Edit" icon="pencil" onClick={handleEditPost} />
                  <Moretools text="Delete" icon="trash" color="text-red" onClick={handleDeletePost} />
                </>
              )}
              <Moretools text="Copy Link" icon="link" onClick={handleCopyLink} />
            </div>
          )}
        </div>
        <div className='w-full mb-2  -mt-1'>
          {isEditing ? (
            <div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className='w-full border rounded p-2'
              />
             {editedImage && (
            <img
              onClick={() => setShowBigImage(true)}
              src={editedImage}
              loading='lazy'
              alt='post Image'
              className='w-full rounded-2xl h-full max-h-[400px] border mt-1 object-contain'
            />
          )}
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
         
            <div className='flex gap-3'>
              <Button
               bgColor='black'
               textColor='white'
               onClick={handleSaveEdit} 
               title='Save'
               />
              <Button
              bgColor='red'
              textColor='white' 
              onClick={() => setIsEditing(false)}
              title="Cancel"
              />
              </div>
            </div>
          ) : (
            <h2 className='text-sm font-semibold'>
                <a href={`/${postAuthor}`}
                 className='mr-1 text-sm hover:underline text-blue-500'>@{postAuthor} 
                </a>
                {reply?.content}</h2>
          )}
          {reply?.image && (
            <img
              onClick={() => setShowBigImage(true)}
              src={reply.image}
              alt='post Image'
              loading='lazy'
              className='w-fit flex-start rounded-2xl h-full max-h-[400px] border mt-1 object-contain'
            />
          )}
        </div>
        {/* <div className='flex gap-[2em] mt-5 mb-2'>
          {/* <Threadstools icon='heart' value={likes}
           onClick={hasLiked ? handleUnlikePost : handleLikePost} 
           active={hasLiked} /> */}
          {/* <Threadstools icon='beacon' value={post?.replies?.length} /> */}
          {/* <Threadstools icon='arrows-retweet' value="80" /> 
          <Threadstools icon='paper-plane' />
        </div> */}
      </div>
    </div>
  );
};

export default ReplyCard;
