import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { serverApp } from '../../server';
import toast, {Toaster} from 'react-hot-toast';
import { uploadImage } from '../common/aws';

const SchoolForm = ({access_token}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [logo, setLogo ] = useState('');
  const [shortName, setShortName] = useState('');


  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name) {
          toast.error("Please add A School Name")
      } else {
          try {
              await axios.post(`${serverApp}/Schools`, { name, logo, shortName }, {
                headers: {
                  'Authorization': `Bearer ${access_token}`
              }
              });
            toast.success("School Created Successfully")
            setName('');
              // navigate('/classroom/Schools')
              
          } catch (error) {
            toast.error(error.response.data)
          console.error('Error creating School:', error);
        }}
      }


      const handleBannerUpload = (e) => {
        let img = e.target.files[0];
        if (img) {
            let loadingToast = toast.loading("Uploading image please wait ..")
            console.log(img)
            uploadImage(img)
            .then((url) => {
                if (url) {
                    setLogo({ logo: url })
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
  return (
      <div className="container mx-auto">
          <Toaster />
      <h3 className=" mb-4">{id ? 'Edit School' : 'Add School'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-4">
          <label className="" htmlFor="name">
            School Name
          </label>
                  <input
            className='input-box'
            id="name"
            type="text"
            placeholder="Enter School name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
                    <label className="" htmlFor="name">
            Enter Short Name
          </label>
                  <input
            className='input-box'
            id="name"
            type="text"
            placeholder="Enter Short name e.g UNILAG, UNIZIK, UNN"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />

<label className="" htmlFor="name">
            School Name
          </label>
                  <input
            className='input-box'
            id="name"
            type="file"
            accept='.png, .jpg, .jpeg'
            hidden
            onChange={handleBannerUpload}
            value={logo}
          />
        </div>
        <div className="flex justify-end">
                  <button
                      onClick={handleSubmit}
            className="bg-black text-white w-[7em] h-[3em] rounded-full"
            type="submit"
          >
            {id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolForm;
