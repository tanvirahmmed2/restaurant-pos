// context/Context.jsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [siteData, setSiteData] = useState(null)
  const [userData, setUserData] = useState(null)

  const fetchCart = async () => {
    try {
      const res = await axios.get('/api/user/cart', { withCredentials: true })
      const plainCart = res.data.payload.map(item => ({
        _id: item._id.toString(),
        productId: item.productId.toString(),
        title: item.title,
        quantity: item.quantity,
        price: item.price
      }))
      setCartItems(plainCart)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/islogin', { withCredentials: true })
        setUserData(response.data.payload)
      } catch (error) {
        console.log(error)
        setUserData(null)

      }

    }
    fetchUserData()

  }, [])


  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const response = await axios.get('/api/website', { withCredentials: true })
        setSiteData(response.data.payload)
      } catch (error) {
        console.log(error)
        setSiteData(null)

      }

    }
    fetchWebsiteData()

  }, [])


  useEffect(() => { fetchCart() }, [])

  return (
    <Context.Provider value={{ cartItems, fetchCart, siteData , userData}}>
      {children}
    </Context.Provider>
  )
}

export const useCart = () => useContext(Context)
