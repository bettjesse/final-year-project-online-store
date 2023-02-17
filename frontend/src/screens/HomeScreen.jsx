import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
// import logger from "use-reducer-logger"
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";
import Product from "../components/Product";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false };
        case "FETCH_FAILED":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const HomeScreen = () => {
    // const[ products, setProducts] = useState([])
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: "",
    });

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const response = await fetch("http://localhost:5000/api/products");
                const result = await response.json();
                dispatch({ type: "FETCH_SUCCESS", payload: result });
                //   setProducts(result);
            } catch (err) {
                dispatch({ type: "FETCH_FAILED", payload: err.message });
                console.log(err)
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1> Featured Products</h1>
            <div className="flex flex-wrap justify-center">
                



                {loading ? (
                    <LoadingSpinner/>
                ) : error ? (
                    <Error message={error}/>
                ) : ( 
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-3">
                    {products.map((product) => (
                    <div className="my-2 mx-2" key={product.name}>
                    <Product product={product} />
                  </div>
                    ))}
                  </div>
                  
                )}





            </div>
        </div>
    );
};

export default HomeScreen;
