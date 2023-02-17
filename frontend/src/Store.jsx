import { createContext, useReducer, useEffect } from "react";

// creating context store
export const Store = createContext();

const initialState = {
    cart: {
        cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
      const cartItems = existItem
        ? state.cart.cartItems.map((item) => (item._id === existItem._id ? newItem : item))
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_EMPTY':
      return { ...state, cart: { cartItems: [] } };
    default:
      return state;
  }
};

// store provider
export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    }, [state.cart.cartItems]);

    const value = { state, dispatch };
    return (
        <Store.Provider value={value}>{props.children}</Store.Provider>
    );
};
