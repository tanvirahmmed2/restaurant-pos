'use client'

import { useCart } from "@/components/context/Context"
import SalesAddToCart from "@/components/forms/SalesAddToCart"
import axios from "axios"
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

const PosPage = () => {
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

    
  const {fetchCart} = useCart()

  useEffect(() => {
    fetchCart()
  }, [])



  return (
    <div className="w-full p-4">
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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 w-full">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <SalesAddToCart key={item._id} product={item} fetchCart={fetchCart}/>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">No items found in this category.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PosPage