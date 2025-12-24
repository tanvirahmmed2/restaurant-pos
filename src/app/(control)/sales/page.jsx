'use client'

import { useState } from "react"

const categories = [
  {
    id: 1,
    category: 'Meals',
    value: 'meals'
  },
  {
    id: 2,
    category: 'Combo',
    value: 'combo'
  },
  {
    id: 3,
    category: 'Snacks',
    value: 'snacks'
  },
  {
    id: 4,
    category: 'Salad',
    value: 'salad'
  },
  {
    id: 5,
    category: 'Drinks',
    value: 'drinks'
  },
  {
    id: 6,
    category: 'Dessert',
    value: 'dessert'
  }
]

const PosPage = () => {
  const [datas, setDatas] = useState(null)
  const [category, setCategory] = useState(null)
  
  return (
    <div className="w-3/4  p-4">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold w-full text-center ">Category</h1>
        <div className="w-full grid grid-cols-6 justify-items-center gap-1">
          {
            categories && categories.map((cat) => (
              <p key={cat.id} onClick={() => setCategory(cat.value)} className={`p-4  w-full text-center ${category === cat.value && 'bg-green-400 text-white'}  cursor-pointer shadow-sm shadow-black/10 rounded-lg`}> {cat.category}</p>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PosPage
