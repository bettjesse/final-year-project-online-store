
import data from './data'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import { Store } from './Store'
import { FaShoppingCart as ShoppingCartIcon } from "react-icons/fa";
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'


import { useContext } from 'react'


function App() {
 
  const {state} = useContext(Store)
  const {cart}= state
  return (
    <BrowserRouter>
    <div className='flex flex-col min-h-[100vh]' >

    <header>
  <div className="flex justify-between items-center bg-green-400 px-4 py-2">
    <div>
      <Link to="/">Green Store</Link>
    </div>
    <div className="relative">
      <Link to="/cart">
        <div className="bg-white rounded-full p-4">
          <ShoppingCartIcon />
          {cart.cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 inline-block bg-green-200 text-white w-5 h-5 rounded-full text-xs font-semibold flex justify-center items-center">
              {cart.cartItems.reduce((a,c)=> a + c.quantity,0)}
            </span>
          )}
        </div>
      </Link>
    </div>
  </div>
</header>



    <main className=' p-4 flex-1'>
      <Routes>
        <Route path='/products/:slug' element = {<ProductScreen/>}/>
        <Route path="/cart" element={<CartScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/'  element= {<HomeScreen/>}/>
      </Routes>
      
    </main>
    <footer>
      <div>
        All rights reserved 
      </div>
    </footer>
    </div>
    </BrowserRouter>
  )
}

export default App
