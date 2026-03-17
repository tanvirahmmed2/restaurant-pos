'use client'
import React, { useContext } from 'react'
import { Context } from '../context/Context'

const About = () => {
  const {siteData}= useContext(Context)
  return (
    <div className="w-full bg-white">

      <div className="w-full py-20 bg-gray-100 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          About {siteData?.title || 'Us'}
        </h1>
      </div>

      <div className="w-full px-4 py-12 flex flex-col gap-6">

        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Our Story
        </h2>

        <p className="text-lg font-medium text-gray-600">
          Every great meal begins with a story.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Ours started with a simple dream — to create a place where food feels like home,
          flavors carry memories, and every guest is treated like family. What began as a small
          kitchen filled with passion has grown into a restaurant built on love, dedication,
          and respect for good food.
        </p>

        <p className="text-gray-600 leading-relaxed">
          We believe that great taste comes from honesty. That’s why we carefully select fresh
          ingredients, balance tradition with creativity, and cook every dish with attention
          and care. Each recipe reflects our roots, inspired by classic flavors and refined
          for today’s table.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Our restaurant is more than just a place to eat — it’s a place to gather, celebrate,
          and slow down. From quiet dinners to joyful moments shared with friends and family,
          we’re honored to be part of your everyday memories.
        </p>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="w-full px-4 text-center">

          <h2 className="text-3xl font-semibold mb-10 text-gray-800">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">
                We use only the freshest and highest quality ingredients in every dish.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
              <p className="text-gray-600">
                Our chefs bring passion and experience to create unforgettable flavors.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Cozy Atmosphere</h3>
              <p className="text-gray-600">
                A warm and welcoming space perfect for family and friends.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default About