import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/loader.component';
import { Toaster, toast } from 'react-hot-toast';
import { PaystackButton } from 'react-paystack';
import { serverApp } from '../../server';
import AnimationWrapper from '../common/page-animation';
import { UserContext } from '../App';



const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { userAuth: { access_token } } = useContext(UserContext)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(`${serverApp}/product`, { product_id: productId });
          setProduct(response.data);
          console.log(response.data)
      } catch (error) {
        toast.error('Error fetching product details');
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Loader />
      ;
  }

  
  const email = product.seller?.personal_info?.email // replace with the user's email
  const amount = product.price * 100; // Paystack amount is in kobo
  const callback_url = 
 console.log(email)
  const initPayment = async () => {
    if (access_token) {
      await axios.post(`${serverApp}/transactions/pay`, { amount, email , callback_url},
        {
          headers: {
                      'Authorization': `Bearer ${access_token}`
          }
        }
      ).then(res => {
        console.log(res.data);
        const access_code = res.data.access_code;
        if (access_code) {
        window.open(`https://checkout.paystack.com/${access_code}`, '_blank');
        }
        
      }).catch(err => {
        console.log(err)
      })
    } else {
      toast.error("Guy!! c'mon you're logged in now.")
      
    }
  

  }

  return (
    <AnimationWrapper>
      <Toaster />
      <div className='p-2'>
        <Link to='/store' className='flex items-center gap-2 bg-grey rounded-full border border-grey  w-fit p-1'>
            <i className="fi fi-rr-arrow-left"></i>
            <p className='font-semibold text-xl'>Store</p>
        </Link>
      </div>
      <div className='max-w-[900px] center py-10 max-lg:px-[5vw] '>
          <img src={product.banner}
          alt={product.name}
          className="aspect-video" />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-xl font-bold text-gray-700">₦{product.price}</p>
          <div className='flex flex-col'>
            <h3 className='font-bold'>Description</h3>
            <p className="text-gray-700 font-gelasio ">{product.description}</p> 
            
          </div>
          {/* <PaystackButton
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            {...config}
            text="Buy Now"
            onSuccess={handlePaystackSuccess}
            onClose={handlePaystackClose}
          /> */}
          <button
            onClick={initPayment}
            className='bg-black rounded-xl w-[12em] p-3 text-white'>Buy Now</button>
        </div>
    </div>
    </AnimationWrapper>
  );
};

export default ProductDetail;
