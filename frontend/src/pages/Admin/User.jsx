import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { Navigate } from 'react-router-dom';
import Loader from '../../components/loader.component';
import axios from 'axios';
import { serverApp } from '../../../server';
import toast from 'react-hot-toast';

const User = () => {
    const { userAuth } = useContext(UserContext);
    const [users, setUsers] = useState();

    // Debugging: log the context value
    console.log('UserContext:', userAuth);

    if (!userAuth) {
        return <Loader />; // or a loading spinner, etc.
    }

    const { access_token, role } = userAuth;

    if (userAuth && role !== 'admin') {
        return <Navigate to='/' />
    }
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
    return (
        <div className='max-w-4xl mx-auto mt-5'>

    <h1 className='text-2xl font-bold'>({users.length}) Users</h1>
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
            </tr>
        </tbody>
        ))}
    </table>
</div>

            </div>
    );
}

export default User;
