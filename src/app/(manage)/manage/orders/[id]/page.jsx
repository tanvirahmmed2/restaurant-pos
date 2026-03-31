'use client'

import axios from "axios"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"// Adjust path as needed
import { Printer, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { generateReceipt } from "@/lib/database/print"

const SingleOrderPage = () => {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`/api/order/${id}`, { withCredentials: true })
                setOrder(res.data.payload)
            } catch (error) {
                console.error("Error fetching order:", error)
                setOrder(null)
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [id])

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="animate-spin text-gray-400" size={32} />
        </div>
    )

    if (!order) return <div className="p-10 text-center">Order not found.</div>

    const orderDate = new Date(order.createdAt || Date.now())
    const formattedDate = orderDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    const formattedTime = orderDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

    return (
        <div className="min-h-screen  py-10 px-4">
            <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center">
                <Link href="/manage/orders" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                    <ArrowLeft size={16} /> Back
                </Link>
                <button 
                    onClick={() => generateReceipt(order)}
                    className="flex items-center gap-2 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
                >
                    <Printer size={18} /> Print Receipt
                </button>
            </div>

            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-sm overflow-hidden border border-gray-200">
                <div className="p-6 bg-white flex flex-col items-center">
                    
                    <div className="text-center border-b-2 border-slate-900 w-full pb-4 mb-4">
                        <h1 className="text-2xl  font-bold tracking-tight text-slate-900">Sara's Dine</h1>
                        <p className=" text-[10px] text-gray-400 uppercase tracking-widest">Mymensingh</p>
                        <p className="text-[11px] mt-1 text-slate-600">— Sales Receipt —</p>
                    </div>

                    <div className="w-full space-y-1 mb-4 border-b border-dashed border-gray-300 pb-4 text-[12px]">
                        <div className="flex justify-between">
                            <span className="text-gray-400 uppercase text-[10px]">Receipt No.</span>
                            <span className=" font-medium uppercase">#{order._id.toString().slice(-6)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 uppercase text-[10px]">Date</span>
                            <span className="">{formattedDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 uppercase text-[10px]">Time</span>
                            <span className="">{formattedTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 uppercase text-[10px]">Customer</span>
                            <span className="font-medium">{order.name}</span>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="grid grid-cols-12 border-y border-slate-900 py-2 text-[10px] font-bold uppercase mb-2">
                            <div className="col-span-7">Description</div>
                            <div className="col-span-2 text-center">Qty</div>
                            <div className="col-span-3 text-right">Total</div>
                        </div>

                        {order.items.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-1 py-2 border-b border-dashed border-gray-200 text-[12px]">
                                <div className="col-span-7 flex flex-col">
                                    <span className="font-semibold text-slate-800">{item.title}</span>
                                    <span className="text-[10px] text-gray-500 ">
                                        @ ৳{item.price.toFixed(2)} {item.discount > 0 ? `(-৳${item.discount})` : ''}
                                    </span>
                                </div>
                                <div className="col-span-2 text-center  self-center">{item.quantity}</div>
                                <div className="col-span-3 text-right  font-semibold self-center">
                                    ৳{((item.price - item.discount) * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full mt-4 space-y-1">
                        <div className="flex justify-between text-[11px] ">
                            <span>Subtotal</span>
                            <span>৳{order.subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[11px]  text-red-600">
                            <span>Discount</span>
                            <span>-৳{order.totalDiscount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-2 border-t border-slate-900 mt-2">
                            <span className="text-[12px] font-bold uppercase">Net Total</span>
                            <span className="text-xl  font-bold italic">৳{order.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center opacity-80">
                        <div className="flex items-end h-6 gap-px">
                            {Array.from({ length: 35 }).map((_, i) => (
                                <div 
                                    key={i} 
                                    className="bg-slate-900" 
                                    style={{ 
                                        width: Math.random() > 0.6 ? '2px' : '1px', 
                                        height: `${Math.floor(Math.random() * 10) + 15}px` 
                                    }}
                                />
                            ))}
                        </div>
                        <span className="text-[8px]  text-gray-400 mt-2 uppercase">ID: {order._id}</span>
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-gray-300 w-full text-center">
                        <p className=" italic text-sm text-slate-700">Thank you for shopping!</p>
                        <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-tighter">Powered by Disibin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleOrderPage;