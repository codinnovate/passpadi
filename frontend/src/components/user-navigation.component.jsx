import React, { useContext } from 'react'
import AnimationWrapper from '../common/page-animation'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../App'
import { removeFromSession } from '../common/session'

const UserNavigationPanel = () => {
    const location = useLocation();
    const { userAuth:{username}, setUserAuth} = useContext(UserContext);
    
    const signOutUser = () => {
        removeFromSession("user")
        setUserAuth({access_token: null })

  }

  return (
        <AnimationWrapper 
        className="absolute right-0 z-50 "
        transition={{duration:0.2}}
        >
        <div className='bg-white absolute right-0 border border-gray w-60 overflow-hidden duration-200'>
         {location.pathname === '/store' ? (
        <Link to="/add-product" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Create Product</p>
        </Link>
      ) : (
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>
      )}
       
              
            <Link to={`/${username}`} className='link pl-8 py-4'>
            Profile
            </Link>
            {location.pathname === '/store' ? null : (
                <Link to='/store' className='link pl-8 py-4'>
                Store
                </Link>
            )}
            {/* <Link to='/dashboard/blogs' className='link pl-8 py-4'>
            Dashboard
            </Link> */}
             <Link to='/settings/edit-profile' className='link pl-8 py-4'>
             Settings 
            </Link>
        <Link 
        to='/community'
          className='link pl-8 py-4'>
             Community
        </Link>
            <span className='absolute border-t border-grey -ml-6 w-[100%] '>
            </span>
            <button 
            onClick={signOutUser}
            className='text-left p-4 hover:bg-grey w-full pl-8 py-4'>
                <h1 className='font-bold text-xl mb-1'>Log Out</h1>
                <p className='text-dark-grey'>@{username}</p>
            </button>

        </div>
        </AnimationWrapper>
    )
}

export default UserNavigationPanel