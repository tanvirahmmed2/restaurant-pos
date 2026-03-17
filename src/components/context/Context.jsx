// context/Context.jsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] })
  const [siteData, setSiteData] = useState(null)
  const [userData, setUserData] = useState(null)
  const [staffData, setStaffData] = useState(null)
  const [categories, setCategories] = useState([])

  const [manageSidebar, setManageSidebar] = useState(false)


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user', { withCredentials: true })
        setUserData(response.data.payload)
      } catch (error) {
        setUserData(null)

      }

    }
    fetchUserData()

  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/staff', { withCredentials: true })
        setStaffData(response.data.payload)
      } catch (error) {
        setStaffData(null)

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
        setSiteData(null)

      }

    }
    fetchWebsiteData()

  }, [])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/category', { withCredentials: true })
      setCategories(res.data.payload)
    } catch (error) {
      setCategories([])

    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])



  const contextValue = {
    manageSidebar, setManageSidebar,
    cart, siteData, userData, staffData,
    categories,
    fetchCategories,
  }

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
}

