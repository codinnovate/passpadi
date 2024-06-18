import React, {useContext, useState, useRef} from 'react'
import { UserContext } from '../App';
import { Outlet, NavLink, Navigate } from 'react-router-dom'

const Classroom = () => {
    let { userAuth: { access_token } } = useContext(UserContext)
    let [pageState, setPageState] = useState();
    let activeTabLine = useRef()
    let sideBarIconTab = useRef();
    let pagetStateTab = useRef();
    const changePageState = () => {
    }

    return (
        access_token === null ? <Navigate to="/signin" /> : 
            <>
                <section className="relative flex gap-10 py-0 m-0 max-md:flex-col ">
                    <div className='sticky top-[80px] z-30'>
                        <div className='md:hidden bg-white py01 border-b border-grey flex flex-nowrap overflow-x-auto '>
                            <button ref={sideBarIconTab}
                                className='p-5 capitalize'
                                onClick={changePageState}
                            >
                                <i className='fi fi-rr-bars-staggered pointer-events-none'></i>
                            </button>
                            <button ref={pagetStateTab}
                                className='p-5 capitalize'
                                onClick={changePageState}
                            >
                                {pageState}
                            </button>
                            <hr ref={activeTabLine}  className='absolute bottom-0 duration-500 '/>

                        </div>
                        <div className="hidden min-w-[200px] h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute max-md:top-[64px] bg-white max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500 ">
                            <h1 className='text-xl text-dark-grey mb-3'>Classroom</h1>
                            <hr className='border-grey -ml-6 mb-8 mr-6' />
                            <NavLink to='/classroom' onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                                <i className="fi fi-rr-hastag"></i>
                                Explore
                            </NavLink>
                             <NavLink to='/classroom/chats' onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                                <i className="fi fi-rr-comment"></i>
                                Chats
                            </NavLink>
                             <NavLink to='/classroom/groups' onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                                <i class="fi fi-rr-users-alt"></i>
                                Groups
                            </NavLink>

                            {/* <h1 className='text-xl text-dark-grey mt-20 mb-3'>Settings</h1>
                            <hr className='border-grey -ml-6 mb-8 mr-6' />
                            
                             <NavLink to='/settings/edit-profile' onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                              <i className='fi fi-rr-user'></i>
                                Edit Profile
                            </NavLink>
                             <NavLink to='/settings/change-password' onClick={(e) => setPageState(e.target.innerText)} className="sidebar-link">
                              <i className='fi fi-rr-lock'></i>
                               Change Password
                            </NavLink> */}
                        </div>
                </div>
                    <div className='max-md:-mt-8 mt-5 w-full'>
                        <Outlet />
                    </div>
                </section>
        </>
    )
}

export default Classroom
