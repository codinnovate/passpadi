import React, { useState, useContext } from 'react';
import axios from 'axios';
import { serverApp } from '../../server';
import { UserContext } from '../App';
import { Navigate, useNavigate } from 'react-router-dom';


const PurchasePoints = () => {
    let { userAuth: { access_token , email } } = useContext(UserContext)
    const [amount, setAmount] = useState(1000);
    const [transaction, setTransaction] = useState(null);
    const [reference, setReference ] = useState(null)
    
    
    const handlePurchase = async () => {
        try {
            const response = await axios.post(`${serverApp}/transactions/pay`,
                { amount: amount * 100, email}, 
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
          key: 'pk_test_6b10c305ac9c9ff3601b7be8b88bd0addd1d2e68', // Replace with your public key
          email: email,
          amount:amount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
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
    const points = amount; // Assuming 1 Naira = 1 Point
    if(access_token === null ) return  <Navigate to='/signin' /> 
    if(reference ) return  <Navigate to={`/verify/${reference}`} /> 
    return (
        <div className='max-w-5xl mx-auto p-2'>
            <h2>Purchase PadiPoints</h2>
            <div className='flex  input-box justify-between max-w-3xl mt-5'>
                <div className='flex flex-col'>
                <div className='flex items-center '>
                <h1 className='font-bold text-3xl'>₦</h1>
                <input
                type="number"
                className='w-[10em] text-2xl font-semibold bg-transparent border-b p-2 outline-none border-gray'
                placeholder="Enter amount in Naira"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            </div>
                <h2 className='text-xl'>Pay these</h2>
                </div>
                <div className='ml-[3em] mt-auto'>
                <h2 className='text-3xl text-blue-400'>{points}pts.</h2>
                <h2 className='text-xl'>You will get these</h2>
                </div>
            </div>
            <p>{email}</p>
            <button 
            className='mt-5 bg-black text-white text-xl font-bold p-3 rounded-2xl'
            onClick={payWithPaystack}>Purchase Points</button>
            {transaction && (
                <div>
                    <p>Transaction Initialized. Redirecting to Paystack...</p>
                </div>
            )}
        </div>
    );
};

export default PurchasePoints;
