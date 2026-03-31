'use client'

import { Context } from "@/components/context/Context"
import axios from "axios"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const SingleOrderPage = () => {
    const [order, setOrder] = useState(null)
    const {siteData}=useContext(Context)
    const { id } = useParams()
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`/api/order/${id}`, { withCredentials: true })
                setOrder(res.data.payload)
            } catch (error) {
                setOrder(null)

            }
        }
        fetchOrder()

    }, [id])



    return (
        <div>
        </div>
    )
}

export default SingleOrderPage
