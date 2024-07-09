import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Navigate, useParams } from 'react-router-dom';
import { serverApp } from '../../server';
import { UserContext } from '../App';

const VerifyTransaction = ({reference}) => {
    const { userAuth: { access_token  } } = useContext(UserContext);
    const [message, setMessage] = useState('Verifying Transaction...Please wait......');
    const [error, setError] = useState(null);
    
    useEffect(() => {
            if(access_token){
              verifyTransaction(reference);
            } else {
              <Navigate to='/signin'/>
            }
    }, [reference]);

    const verifyTransaction = async (reference) => {
        try {
            const response = await axios.post(`${serverApp}/transactions/verify`, {reference}, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            console.log(response)

            if (response.status === 200) {
                setMessage('Transaction successful! Your App has been activated Automatically., just make sure to login again ');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while verifying the transaction.');
        }
    };

    return (
        <div className='max-w-5xl mx-auto '>
            <h2 className='text-xl'>{message}</h2>
            {error && <p>{error}</p>}
        </div>
    );
};

export default VerifyTransaction;
