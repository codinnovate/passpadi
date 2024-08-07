import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { Navigate } from 'react-router-dom';
import Loader from '../../components/loader.component';
import axios from 'axios';
import { serverApp } from '../../../server';
import toast, { Toaster } from 'react-hot-toast';

const User = () => {
    const { userAuth } = useContext(UserContext);
    const [users, setUsers] = useState();

    if (!userAuth) {
        return <Loader />; // or a loading spinner, etc.
    }

    const { access_token, role } = userAuth;

    
    const getUsers = async () => {
        await axios.get(serverApp + '/users/', {
            headers: {
                'Authorization':`Bearer ${access_token}`
            }       
         })
        .then((res) => {
            setUsers(res?.data)
            console.log(res.data)
        }
        )
        .catch((err) => {
            console.log(err?.message)
            toast.error(err?.message)

        }
    )
    }
    useEffect(() => {
        if(access_token){
            getUsers();

        } else {
        <Navigate to='/signin' />
        }
    },[access_token])

const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${serverApp}/user/delete/${userId}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        toast.success(response?.message)
        toast.success('User account deleted successfully');
        // Redirect or update UI after deletion
        window.location.reload();
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user, .');
    }
};
const activateUser = async (userId) => {
    try {
        const response = await axios.put(`${serverApp}/user/activate/${userId}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        toast.success(response?.message)
        toast.success('User App Activated');
        // Redirect or update UI after deletion
        window.location.reload();
    } catch (error) {
        console.error('Error activating account:', error);
        toast.error('Error Activating app, .');
    }
};

    if (role && role != 'admin'  ) {
        <Navigate to='/' />
     } 
    return (
        <div className='max-w-6xl mx-auto mt-5 p-2'>
            <Toaster />
    <h1 className='text-2xl font-bold'>({users?.length}) Users</h1>
    <div class="relative overflow-x-auto mt-[1em]">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   Full Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Phone Number
                </th>
                <th scope="col" class="px-6 py-3">
                    role/points
                </th>
                <th scope="col" class="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        {users && users.map((item, index) => (
        <tbody key={index}>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}. {item?.personal_info?.fullname}
                </th>
                <td class="px-6 py-4">
                 {item.personal_info.email}
                </td>
                <td class="px-6 py-4">
                    {item.personal_info?.phoneNumber}
                </td>
                <td class="px-6 py-4 text-blue-500">
                    {item.role}/{item.personal_info.points}
                </td>
                {role == 'superadmin' && (
                <td class="px-6 py-4">
                    <button 
                    onClick={() => deleteUser(item._id)}
                    className='bg-red p-1 rounded-xl'>
                     <h1 className='text-white font-bold '>Delete</h1>
                    </button>
                    {item.role != 'paidUser' &&  (
                    <button 
                    onClick={() => activateUser(item._id)}
                    className='bg-green p-1 rounded-xl mt-2'>
                     <h1 className='text-white font-bold '>Activate</h1>
                    </button>
                    )}
                </td>
                )}
                
            </tr>
        </tbody>
        ))}
    </table>
</div>

            </div>
    );
}

export default User;
