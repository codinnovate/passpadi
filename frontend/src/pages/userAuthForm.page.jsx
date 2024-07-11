import React, { useContext, useRef } from 'react'
import InputBox from '../components/input.component'
import googleIcon from '../imgs/google.png';
import { Link, Navigate } from 'react-router-dom';
import AnimationWrapper from '../common/page-animation'
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { storeInSession} from '../common/session'
import { UserContext} from '../App';
import { authWithGoogle} from '../common/firebase';


const UserAuthForm = ({ type }) => {
     let { userAuth: {access_token}, setUserAuth } = useContext(UserContext)
    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({data}) => {
            storeInSession("user", JSON.stringify(data))
            setUserAuth(data)
            console.log(data)
        })   
        .catch(({ response }) => {
            console.log(response)
            toast.error(response?.data?.error)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let serverRoute = type == "sign-in" ? "/signin" : "/signup";

        
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


        // formdata
        let form = new FormData(formElement)
        let formData = {};

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        // for validation
        let { fullname, email, password } = formData;

      
    if(fullname && fullname.length < 3){
        return toast.error("Fullname must be at least 3 letters")
    }
        if (!email.length) {
            return toast.error("Enter Email")}
        
        if (!emailRegex.test(email)) {
            return toast.error("Email is invalid!!")}
         if (!passwordRegex.test(password)){
        return toast.error("Password should be 6 to 20 characters long with  numberic, 1 lowercase and 1 uppercase letters")}

        userAuthThroughServer(serverRoute, formData)
    }
    const handleGoogleAuth = async (e) => {
            e.preventDefault();
         await authWithGoogle()
            .then(user => {
            let serverRoute = '/google-auth';
            let formData = {
                access_token:user.accessToken
            }
            userAuthThroughServer(serverRoute, formData)
                
            })
                .catch(err => {
                    toast.error("trouble login through google");
                    return console.log(err)
            })
        }
    return (
        access_token ? 
        <Navigate to='/' />
        :
        <AnimationWrapper
        keyValue={type}>
            <section className='h-cover flex items-center justify-center'>
                <Toaster />
                <form
                    id="formElement"
                    className='w-[80%] max-w-[400px]'>
                <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
                    {type == "sign-in" ? "Welcome back" : "Join us today!"}</h1>
                {
                    type != "sign-in" ?
                    <InputBox
                    name="fullname"
                    type="text"
                    placeholder="Full Name"
                    icon="fi-rr-user"
                    /> : ""
                }  
                
                <InputBox
                            name="email"
                            type="email"
                            placeholder="Email"
                            icon="fi-rr-envelope"
                            />
                 <InputBox
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon="fi-rr-key"
                            />

{
                    type != "sign-in" ?
                    <InputBox
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter Phone number, e.g 0812300000"
                    icon="fi-rr-phone-flip"
                    /> : ""
                }  
                               {
                    type != "sign-in" ?
                    <InputBox
                    name="referralCode"
                    type="text"
                    placeholder="Enter Refferal Code, Skip if none"
                    icon="fi-rr-user"
                    /> : ""
                }  
                
                    <button
                    onClick={handleSubmit}
                    type='submit'
                    className='btn-dark center mt-14'>
                {type.replace("-", " ")}
                </button>
                <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
                    <hr className='w-1/2 border-black' />
                    <p>or</p>
                    <hr className='w-1/2 border-black' />
                </div> 
                        <button
                            onClick={handleGoogleAuth}
                            className='btn-dark flex items-center justify-center gap-4 w-[90%] center'>
                    <img src={googleIcon}  className='w-5'/>
                    continue with google
                </button>

                {
                    type == "sign-in" ?
                    <p className='mt-6 text-dark-grey text-xl text-center'>
                            Don't have an account ?
                        <Link to='/signup' className='underline text-black text-xl ml-1'>join us today</Link>
                        </p>
                        : 
                        <p className='mt-6 text-dark-grey text-xl text-center'>
                            Already a member ?
                        <Link to='/signin' className='underline text-black text-xl ml-1'>Login here .</Link>
                        </p>
                }
        </form>
        </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm
