import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { serverApp } from '../../server';
import { UserContext } from '../App';
import { Navigate, useNavigate } from 'react-router-dom';
import VerifyTransaction from './verifyTransactions';
import toast, { Toaster } from 'react-hot-toast';


const PurchasePoints = () => {
    const router = useNavigate()
    // const [email, setEmail] = useState();
    let { userAuth: { access_token , email } } = useContext(UserContext)
    console.log(access_token)
    console.log(email)
    // const [amount, setAmount] = useState(1000);
    const [transaction, setTransaction] = useState(null);
    const [reference, setReference ] = useState(null)
    


    
    const handlePurchase = async () => {
        try {
            const response = await axios.post(`${serverApp}/transactions/pay`,
                {email:email}, 
                {
                headers: {
                    'Authorization':`Bearer ${access_token}`
                }
            });
            console.log(response);
            setTransaction(response.data);
            window.location.href = `https://checkout.paystack.com/${response.data.access_code}`;
        } catch (error) {
            console.error('Error initializing transaction:', error);
        }
    };
    function payWithPaystack() {
        const handler = PaystackPop.setup({
          key: import.meta.env.VITE_PAYSTACK_PUBLICK_KEY, // Replace with your public key
          email: email,
          amount:100000, // the amount value is multiplied by 100 to convert to the lowest currency unit
          currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
          callback: function(response) {
            //this happens after the payment is completed successfully
            const reference = response.reference;
            setReference(reference)


          },
          onClose: function() {
            alert('Transaction was not completed, window closed.');
          },
        });
        handler.openIframe();
      }
      if(reference ) return  <VerifyTransaction amount='1000' reference={reference}  />


    if(access_token === null ) return <Navigate to='/signin' />
    return (
        <div className='max-w-5xl mx-auto p-2'>
            <Toaster />
            <h2>Activate Your Cbt App Automatically.</h2>
            <button 
            className='mt-5 bg-black text-white text-xl font-bold p-3 rounded-2xl'
            onClick={payWithPaystack}>Pay Now</button>
            {transaction && (
                <div>
                    <p>Transaction Initialized. Redirecting to Paystack...</p>
                </div>
            )}
        </div>
    );
};

export default PurchasePoints;
