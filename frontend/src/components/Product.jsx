import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { Store } from '../Store';

const Product = ({product}) => {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart: {cartItems}} = state;

  const addToCartHandler = async (product) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
  
    const response = await fetch(`http://localhost:5000/api/products/${product._id}`);
    const data = await response.json();
    const item = { ...data, quantity };
  
    if (quantity > item.countInStock) {
      window.alert(`Sorry, we only have ${item.countInStock} in stock.`);
      return;
    }
  
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: item,
    });
  
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, item]));
  };
  
  return (
    <div>
  <div className="border border-black p-4 max-w-xs">
    <Link to={`products/${product.slug}`}>
      <img className="w-full h-40 object-cover" src={product.image} alt={product.name} />
    </Link>
    <div className="mt-2">
      <Link to={`products/${product.slug}`}>
        <p className="font-medium text-gray-700">{product.name}</p>
      </Link>
      <p className="text-gray-600 font-bold mt-1">
        ksh{product.price}
      </p>
      <button onClick={()=>addToCartHandler(product)} className=" bg-green-700 text-white py-2 px-4 rounded">
        Add to cart
      </button>
    </div>
  </div>
</div>
  )}
  export default Product