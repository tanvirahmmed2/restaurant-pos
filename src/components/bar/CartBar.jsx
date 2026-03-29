'use client'
import React, { useContext,  } from 'react'
import { Context } from '../context/Context'
import Link from 'next/link'
import Image from 'next/image'
import { MdDeleteOutline } from 'react-icons/md'

const CartBar = () => {
    const { subTotal,  totalPrice,  totalDiscount, cartBar, setCartBar, addToCart, removeFromCart, decreaseQuantity, clearCart, userData, cart } = useContext(Context)
   

    return (
        <div className={`${!cartBar ? 'translate-x-full' : 'translate-x-0'} z-40 transform ease-in-out duration-500 w-full sm:w-100 fixed top-16 right-0 bg-white border border-black/20 shadow-xl h-screen overflow-y-scroll flex flex-col items-center p-4 pb-28`}>
            {
                cart?.items.length === 0 ? <div className='w-full flex flex-col items-center gap-7 '>
                    <p>No Item Found</p>
                    <Link href={'/menu'} className='px-6 p-1 border border-black/20 rounded-2xl' onClick={() => setCartBar(!cartBar)}>Menu</Link>
                </div> :
                    <div className=' w-full relative flex flex-col items-center justify-between gap-10'>
                        <div className='w-full flex items-center flex-col gap-4'>
                            <button className='w-full border border-black/20 rounded-2xl cursor-pointer' onClick={() => setCartBar(!cartBar)}>Close</button>

                            <h1 className='text-2xl font-semibold'>Items</h1>
                            <div className='w-full flex flex-col items-center justify-between gap-4 '>
                                <div className='w-full flex flex-col items-center gap-2'>
                                    {
                                        cart?.items.length > 0 && cart?.items.map((item) => (
                                            <div key={item._id} className='w-full grid grid-cols-5 border border-black/20 p-1 rounded-lg gap-2'>
                                                <div className='w-full col-span-1'>
                                                    <Image src={item?.image} alt='item image' width={50} height={50} className='w-full aspect-square rounded-lg object-cover overflow-hidden' />
                                                </div>
                                                <div className='w-full col-span-4 flex flex-col gap-2'>
                                                    <p>{item.title}</p>
                                                    <div className='w-full grid grid-cols-4 justify-items-center'>
                                                        <button className='bg-green-500 rounded-full text-white px-6 cursor-pointer' onClick={() => addToCart(item)}>+</button>
                                                        <p>{item.quantity}</p>
                                                        <button className='bg-green-500 rounded-full text-white px-6 cursor-pointer' onClick={() => decreaseQuantity(item._id)}>-</button>
                                                        <button className='text-xl cursor-pointer' onClick={() => removeFromCart(item._id)}><MdDeleteOutline /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='bg-slate-700 text-white p-2 rounded-lg w-full flex flex-col gap-3 font-mono text-xs sm:text-base'>
                                    <div className='w-full flex flex-row items-center justify-between '>
                                        <p>SubTotal</p>
                                        <p>{subTotal}</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center justify-between '>
                                        <p>Discount</p>
                                        <p>{totalDiscount}</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center justify-between text-2xl font-semibold'>
                                        <p>Total Price</p>
                                        <p>{totalPrice}</p>
                                    </div>
                                    <Link href={'/checkout'} className='w-full p-1 bg-white rounded-lg cursor-pointer text-black text-center' onClick={() => setCartBar(!cartBar)}>Checkout</Link>
                                </div>
                            </div>
                        </div>
                        <button className='px-6 p-1 border border-black/20 rounded-2xl cursor-pointer' onClick={() => clearCart()}>Clear cart</button>
                        
                    </div>
            }
        </div>
    )
}

export default CartBar
