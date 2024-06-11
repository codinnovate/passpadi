import React, { useState } from 'react'
import AnimationWrapper from '../common/page-animation'
import InputBox from '../components/input.component'
import { Toaster, toast } from 'react-hot-toast'


const ChangePassword = () => {
    // const [currentPassword, setCurrentPassword] = useState();
    // const [newPassword, setNewPassword] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();
    }
    // let { currentPassword, newPassword } = formData;
    // if (!currentPassword || !newPassword) {
    //     return toast.error("Fill all the inputs")
    // }

    return (
        <AnimationWrapper>
            <Toaster />
            <form >
                <h1 className='max-md:hidden'>Change Password</h1>
                <div className='py-10 w-full md:max-w-[400px] '>
                    <InputBox
                        name="currentPassword"
                        type="password"
                        className="profile-edit-input"
                        placeholder="Current Password"
                        icon="fi-rr-unlock" />
                    <InputBox
                        name="newPassword"
                        type="password"
                        className="profile-edit-input"
                        placeholder="New Password"
                        icon="fi-rr-unlock" />
                    <button
                        onClick={handleSubmit}
                        className='btn-dark px-10' type="submit">
                    Change Password
                    </button>
                </div>
            </form>
            
        </AnimationWrapper>
    )
}

export default ChangePassword
