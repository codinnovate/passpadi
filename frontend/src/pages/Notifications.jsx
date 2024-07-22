import React, { useContext, useEffect, useState } from 'react'
import IconWrapper from '../components/UI/IconWrapper';
import axios from 'axios';
import { serverApp } from '../../server';
import { UserContext } from '../App';




function NotifsCard({title}) {
  return (
    <div className='bg-black/10 p-2 rounded-lg'>
    <h1 className='text-blue-500 font-medium'>
     {title}
    </h1>
    </div>
  )
}



const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const { userAuth, userAuth: { access_token, profile_img } } = useContext(UserContext);
    
    
    
    const getNotifs = async () => {
      try {
        const response =  await axios.get(serverApp + '/notifications', {
          headers:{
              Authorization: `Bearer ${access_token}`
          }
      })
      setNotifications(response.data)
      } catch (error) {
        
      }
        
    }
    
    
    useEffect(() => {
      getNotifs();
    }, [access_token])
  return (
    <div className='md:max-w-3xl w-full p-2 flex flex-col mx-auto'>
        <div className='flex justify-between w-full'>
        <h1 className='text-2xl font-bold'>Notifications</h1>  
        <div className='relative'>
        <IconWrapper
        icon='fi fi-rr-bell'
        />
        <span className=' absolute top-0 right-0 bg-red text-white w-6 h-6 text-center font-bold text-sm rounded-full'>
          {notifications.length}
        </span> 
        </div>  
        </div>
        <div className='flex flex-col gap-2'>
            { notifications.map((notif, index) => (
              <NotifsCard 
              key={index}
              title={notif.message}

              
              />
            ))}
        </div>
    </div>
  )
}

export default Notifications
