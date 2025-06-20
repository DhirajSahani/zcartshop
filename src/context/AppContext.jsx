import React from "react";
import { children, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isSeller, setIsSeller] = useState(false)
  const [showUserLogin, setShowUserLogin] = useState(false)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  //Fetch all Products
  const fetchProduts = async () => {
    setProducts(dummyProducts)
  }

  //add products to cart
  const addToCart = (itemId) => {
    let CartData = structuredClone(cartItems);
    if (CartData[itemId]) {
      CartData[itemId] += 1;
    } else {
      CartData[itemId] = 1;
    }

    setCartItems(CartData);
    toast.success("Added to Cart");
  };

  // Updated To Cart Item Quantity
  const updateCartItem = (itemId, quantity) => {
    let CartData = structuredClone(cartItems);
    CartData[itemId] = quantity;
    setCartItems(CartData)
    toast.success = ("cart updated")

  }

  //Remove  products From Cart
  const removeFromCart = (itemId) => {
    let CartData = structuredClone(cartItems);

    if (CartData[itemId]) {
      CartData[itemId] -= 1;

      if (CartData[itemId] === 0) {
        delete CartData[itemId];
      }

      toast.success("Removed from Cart");
    }

    setCartItems(CartData);
  }

// Get Cart item count
const getCartCount = ()=>{
  let totalCount = 0;
  for(const item in cartItems){
    totalCount += cartItems[item];
  }
  return totalCount;
}

// Get Cart Total Amount

const getCartAmount = ()=>{
  let totalAmount = 0;
  for (const item in cartItems){
    let itemInfo = products.find((product)=>product._id === item);
    if(cartItems[item] > 0 ){
      totalAmount += itemInfo.offerPrice * cartItems[item]
    }
  
  }

  return Math.floor(totalAmount * 100) / 100 ;

}



  useEffect(() => {
    fetchProduts()
  }, [])


  const value = {
    navigate, user, setUser, setIsSeller, isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery,setSearchQuery, getCartAmount, getCartCount

  }

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)

}