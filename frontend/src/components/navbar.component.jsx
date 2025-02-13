import { Link ,  Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../imgs/logo.png';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import UserNavigationPanel from './user-navigation.component';
import Logo from './logo.component';


const Header = () => {
    const location = useLocation();
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
    const [userNavPanel, setUserNavPanel] = useState(false) 
    const navigate = useNavigate();
    const {userAuth, userAuth:{ access_token, profile_img }} = useContext(UserContext);
    
    const handleUserNavPanel = () => {
        setUserNavPanel(!userNavPanel);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false);
        }, 200)
    }

    const handleSearch = (e) => {
        let query = e.target.value;
        if (e.keyCode == 13 && query.length) {
            navigate(`/search/${query}`);
            
            
        }
    }
    return (
        <div className='flex flex-col'>
        <nav className='navbar'>
            
            <Logo />

            <div className={`absolute  bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw]
            md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show  ${ searchBoxVisibility ? "show": "hide"}`}>
                <input
                type='text'
                placeholder='Search'
                className='w-full md:w-auto bg-grey  p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12' 
                onKeyDown={handleSearch}
                    />
                <i className='fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2  text-xl text-dark-grey'></i>
                </div>
                
                <div className='flex gap-3 items-center '>
                     
                       {/* <Link to='/store' className='hidden md:flex gap-2 link'>
                    <i className='fi fi-rr-shop'></i>
                    <p>Store</p>
                    </Link>   */}
                    <Link to='/classroom' className='hidden md:flex gap-2 link'>
                        <i className="fi fi-rr-e-learning"></i>
                        <p>Classroom</p>
                    </Link>  
                     <Link to='/articles' className='hidden md:flex gap-2 link'>
                     <i className="fi fi-rr-books"></i>
                    <p>Articles</p>
                    </Link> 
                </div>

            <div className='flex items-center gap-3 md:gap-6 ml-auto '>
                <button
                    onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}
                    className='md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center'>
                    <i className='fi fi-rr-search text-xl'></i>
                </button>
                    {/* {
                        location.pathname === '/store' && (
                        <Link to='/add-product' className='hidden md:flex gap-2 link'>
                    <i className='fi fi-rr-file-edit'></i>
                    <p>Create Product</p>
                            </Link>
                            
                        )
                    } */}
                    
                    
                    {
                        location.pathname === '/classroom' && (
                        <Link to='/create-subject' className='hidden md:flex gap-2 link'>
                    <i className='fi fi-rr-file-edit'></i>
                    <p>create Subject</p>
                            </Link>
                            
                        )
                    }

                

                {access_token ?
                <>
                    {/* <Link to='/dashboard/notification'>
                        <button className='w-12 h-12 rounded-full bg-grey relative hover:bg-black/10'>
                        <i className='fi fi-rr-bell text-2xl block mt-1'></i>
                        </button>
                    </Link> */}
                    
                    <div className="relative">
                        <button
                        onBlur={handleBlur}
                        onClick={handleUserNavPanel}
                        className='w-12 h-12  mt-1'>
                        <img
                        src={profile_img}
                        className='w-full h-full object-cover rounded-full ' />
                        </button>
                        {
                        userNavPanel ? 
                        <UserNavigationPanel />
                        : "" }
                    </div>
                        </>
                        :
                        <>
                <Link
                    className='btn-dark py-2 '
                    to='/signin'
                    >
                    Login
                </Link>
                 <Link
                    className='btn-light py-2 hidden md:block'
                    to='/signup'
                    >
                    Register
                </Link>                
                </>
                }
            </div>

        </nav>
        <Outlet />
        </div>
    )
}

export default Header
