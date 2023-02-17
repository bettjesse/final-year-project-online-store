import React from 'react'
import { useParams } from 'react-router-dom'
import { useReducer } from 'react';
import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';
import { getError } from '../utils';
import { Store } from '../Store';
import { useContext } from 'react';
import axios from "axios"



const reducer = (state, action) => {
  switch (action.type) {
      case "FETCH_REQUEST":
          return { ...state, loading: true };
      case "FETCH_SUCCESS":
          return { ...state, product: action.payload, loading: false };
      case "FETCH_FAILED":
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};




const ProductScreen = () => {
    const params= useParams()
 const { slug } = params

 const [{ loading, error, product }, dispatch] = useReducer(reducer, {
  product: [],
  loading: true,
  error: "",
});

useEffect(() => {
  const fetchProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
          const response = await fetch(`http://localhost:5000/api/products/slug/${slug}`);
          const result = await response.json();
          dispatch({ type: "FETCH_SUCCESS", payload: result });
          //   setProducts(result);
      } catch (err) {
          dispatch({ type: "FETCH_FAILED", payload:  getError(err) });
          console.log(err)
      }
  };

  fetchProducts();
}, [slug]);

const {state,dispatch:ctxDispatch} = useContext(Store)
const {cart}= state 
//use gpt 
const addToCartHandler = () => {
  const existItem = cart.cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  if (product.countInStock < quantity) {
    window.alert('Sorry. Product is out of stock');
    return;
  }
  ctxDispatch({
    type: 'CART_ADD_ITEM',
    payload: { ...product, quantity },
  });
};

  return (
    <div>
       {
        loading ? 
       <LoadingSpinner/>
        :
        error ?
        <Error message= {error}/>
        :
        <div className="flex flex-col md:flex-row px-4 gap-4 mt-3">
  <div className="md:w-1/2">
    <img className="w-full md:w-3/4 mx-auto" src={product.image} alt={product.name} />
  </div>
  <div className="md:w-1/2">
    <h2 className="text-2xl font-bold">{product.name}</h2>
    <p>{product.description}</p>
    <div className='flex items-center'>
      <p className='mr-4 text-lg mt-2 mb-2'>Price</p>
      <p className="text-gray-600 text-lg mt-2 mb-4">ksh{product.price}</p>
    </div>
    <div className='flex items-center mb-2'>
      <p className='mr-4 text-lg mt-2'>Status</p>
      {product.countInStock > 0 ? (
        <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mt-2">In Stock</span>
      ) : (
        <span className="inline-block bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mt-2">Out of Stock</span>
      )}
    </div>
    {product.countInStock > 0 && (
      <button onClick = {addToCartHandler}  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Add to cart
      </button>
    )}
  </div>
</div>

      
      
       }
        </div>
  )
}

export default ProductScreen