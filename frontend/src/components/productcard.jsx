import React from 'react'
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {
    // let { personal_info: { fullname, username, profile_img } } = seller;  

    
    return (
          <Link
            to={`/product/${product.product_id}`}
            key={product._id}
            className="flex flex-col gap-4 w-[356px] h-[350px]">
            <img
                src={product.banner}
                loading='lazy'
                alt={product.name}
                className="w-full rounded-lg h-[236px]
                object-fit" />
            <div className='flex  gap-4 w-full'>
                <Link to={`/user/${product.seller?.personal_info?.username}`}
                    className='flex mr-1'>
                    <img
                        className='w-6 h-6 rounded-full'
                        src={product.seller?.personal_info?.profile_img} />                    
                </Link>
                <div className=''>
                    <h1>@{product.seller?.personal_info?.username}</h1>
                    <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                    <div className='flex gap-2'>
                    <p className="text-yellow font-bold">₦ {product.price == 0 ? "Free" : product.price }</p>
                    <p className="text-dark-grey line-through ">₦ {product.price + 1000 }</p>
                    </div>
                </div>
            </div>
          </Link>
    )
}

export default ProductCard
