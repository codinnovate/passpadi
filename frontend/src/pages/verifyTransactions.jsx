import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Navigate, useParams } from 'react-router-dom';
import { serverApp } from '../../server';
import { UserContext } from '../App';

const VerifyTransaction = () => {
    const { userAuth: { access_token  } } = useContext(UserContext);
    const {reference} = useParams();
    const [message, setMessage] = useState('Verifying Transaction...');
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
            const response = await axios.get(`${serverApp}/transactions/verify/${reference}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            console.log(response)

            if (response.data.status === 'success') {
                setMessage('Transaction successful! Points have been added to your account.');
            } else {
                setMessage('Transaction verification failed.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while verifying the transaction.');
        }
    };

    return (
        <div>
            <p>Verify {reference}</p>
            <h2>{message}</h2>
            {error && <p>{error}</p>}
        </div>
    );
};

export default VerifyTransaction;
