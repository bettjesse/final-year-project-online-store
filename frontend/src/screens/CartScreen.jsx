


import { useContext } from "react";
import { Store } from "../Store";
import React from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { FaTrash } from 'react-icons/fa';

const CartScreen = () => {
    const navigate= useNavigate()
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart: {cartItems}} = state;
    const updateCartHandler = async (item, quantity) => {
        if (quantity < 1) {
            quantity = 1;
          }
        const response = await fetch(`http://localhost:5000/api/products/${item._id}`);
        const product = await response.json();
        if (quantity > product.countInStock) {
          window.alert(`Sorry, we only have ${product.countInStock} in stock.`);
          return;
        }
        ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...item, quantity },
        });
      };
      
      const removeItemHandler = (item) => {
        ctxDispatch({
          type: 'CART_REMOVE_ITEM',
          payload: { _id: item._id },
        });
        if (cartItems.length === 1) {
          ctxDispatch({
            type: 'CART_EMPTY',
          });
        }
      };
      
       const chekoutHandler = ()=> {
        navigate("/sigin? redirect=/shipping")
       }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row md:w-full md:justify-between">
                <div className="md:w-8/12">
                    {cartItems.length === 0 ? (
                        <div className=" mt-8 md:mt-0 md:w-3/12 bg-gray-100 p-4 rounded-md ">
                            Your cart is empty. <Link className="hover:underline text-lg font-medium text-gray-900" to="/">Go shopping</Link>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li key={item._id} className="py-4 flex">
                                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <Link to={`/product/${item.slug}`} className="text-lg font-medium text-gray-900 hover:underline">
                                                {item.name}
                                            </Link>
                                            <p className="mt-1 text-sm text-gray-500">{item.price}</p>
                                        </div>
                                        <div className="flex mt-4 md:mt-0">
                                            <button
                                                className="bg-gray-200 py-1 px-2 rounded-md"
                                                onClick={()=> updateCartHandler(item,item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                            <p className="px-4 text-md font-semibold">{item.quantity}</p>
                                            <button
                                                className="bg-gray-200 py-1 px-2 rounded-md"
                                                onClick={()=> updateCartHandler(item,item.quantity -1)}
                                            >
                                                -
                                            </button>
                                            <button onClick={()=>removeItemHandler(item)} className="bg-gray-200 py-1 px-2 rounded-md ml-4" >
                                    <FaTrash />
                                </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mt-8 md:mt-0 md:w-3/12 bg-gray-100 p-4 rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
                    <p className="text-lg font-medium mb-2">
                        Total:{" "}
                        {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                    </p>
                    <Link to= "/login">
                    <button  className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
                        Proceed to Checkout
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
