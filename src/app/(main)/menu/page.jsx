'use client'

import AddtoCart from "@/components/buttons/AddtoCart"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useMemo } from "react"

const categories = [
  { id: 1, category: 'All', value: null },
  { id: 2, category: 'Meals', value: 'meals' },
  { id: 3, category: 'Combo', value: 'combo' },
  { id: 4, category: 'Snacks', value: 'snacks' },
  { id: 5, category: 'Salad', value: 'salad' },
  { id: 6, category: 'Drinks', value: 'drinks' },
  { id: 7, category: 'Dessert', value: 'dessert' }
]

const Menu = () => {
  const [allProducts, setAllProducts] = useState([])
  const [category, setCategory] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/product', { withCredentials: true })
        setAllProducts(response.data.payload)
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }
    fetchData()
  }, [])

  const filteredData = useMemo(() => {
    if (!category) return allProducts;
    return allProducts.filter((item) => item.category === category);
  }, [category, allProducts]);


  return (
    <div className="w-full p-4 min-h-screen">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold w-full text-center">Category</h1>

        <div className="w-full grid grid-cols-3 md:grid-cols-7 justify-items-center gap-2">
          {categories.map((cat) => (
            <p
              key={cat.id}
              onClick={() => setCategory(cat.value)}
              className={`p-4 w-full text-center cursor-pointer shadow-sm rounded-lg transition-colors
                ${category === cat.value ? 'bg-indigo-300 text-white' : 'bg-white text-gray-700'}
              `}
            >
              {cat.category}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 mt-8 w-full">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (

              <Link key={item._id} href={`/menu/${item.slug}`} className="w-full flex flex-col items-center justify-center p-1 border border-black/10 rounded-lg overflow-hidden">
                <Image src={item.image} alt={item.title} width={1000} height={1000} className="w-full rounded-lg overflow-hidden" />
                <div className="w-full flex flex-row items-start justify-between gap-2 py-3">
                  <h1 className="text-xs">{item.title}</h1>
                  <p className="text-sm flex flex-row items-center gap-2"><span className="text-[8px] italic ">BDT</span> {item.price}</p>
                </div>
              </Link>
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