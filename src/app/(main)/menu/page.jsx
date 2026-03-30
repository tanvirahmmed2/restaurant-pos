'use client'

import Item from "@/components/card/Item"
import { Context } from "@/components/context/Context"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState, useMemo, useContext } from "react"



const Menu = () => {
  const [products, setProducts] = useState([])
  const { categories } = useContext(Context)
  const [categoryId, setCategoryId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/product?q=${categoryId}`, { withCredentials: true })
        setProducts(response.data.payload)
      } catch (error) {
        setProducts([])
      }
    }
    fetchData()
  }, [categoryId])




  return (
    <div className="w-full p-4 min-h-screen">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <button onClick={() => setCategoryId('')} className="text-2xl cursor-pointer font-semibold w-full text-center">Menu</button>

        <div className="w-full grid grid-cols-3 md:grid-cols-6 justify-items-center gap-2">

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setCategoryId(cat._id)}
              className={`p-4 w-full text-center cursor-pointer shadow-sm rounded-lg transition-colors
                ${categoryId === cat._id ? 'bg-indigo-300 text-white' : 'bg-white text-gray-700'}
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mt-8 w-full">
          {products.length > 0 ? (
            products.map((item) => (
              <Item item={item} key={item._id} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">No items found in this category.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu