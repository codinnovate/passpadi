// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverApp } from '../../server';
import { Link } from 'react-router-dom';
import ProductCard from './productcard';
import AnimationWrapper from '../common/page-animation';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(serverApp + '/get-product');
          setProducts(response.data);
          console.log(response.data)
      } catch (error) {
        console.error('There was an error fetching the products!', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col w-full ">
      <h3 className="font-semibold text-center my-4">Markets</h3>
      <div className="bg-black w-full h-[20vh]">

      </div>
      <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-[1em]">
        {products.map((product, index) => {
          return <AnimationWrapper>
          <ProductCard key={product._id} product={product} />
          </AnimationWrapper>

        }
        )}
      </div>
    </div>
  );
};

export default ProductList;
