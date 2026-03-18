import ConnectDB from "@/lib/database/mongo";
import Order from "@/lib/models/order";
import { NextResponse } from "next/server";
import Customer from "@/lib/models/customer";
import { isStaff } from "@/lib/auth/staffmiddleware";


export async function GET() {
    try {
        await ConnectDB()
        const auth= await isStaff()
                if(!auth.success){
                    return NextResponse.json({
                        success:false, message:auth.message
                    },{status:400})
                }
        const orders = await Order.find({}).sort({ createdAt: -1 })
        if (!orders || orders.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No order found'
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully fetched orders',
            payload: orders
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch orders',
            error: error.message
        }, { status: 500 })

    }

}


export async function POST(req) {
    try {
        await ConnectDB();
        const data = await req.json();
        
        const { 
            phone, 
            deliveryMethod, 
            items, 
            subTotal, 
            totalDiscount, 
            totalPrice, 
            paymentMethod,
            table,
            status,
            transactionId
        } = data;

        if (!items || items.length === 0) {
            return NextResponse.json({ success: false, message: "Cart is empty" }, { status: 400 });
        }

        const customerPhone = phone?.trim() || '01900000000';
        let customerName = 'guest';
        let existingCustomer = await Customer.findOne({ phone: customerPhone });

        if (existingCustomer) {
            customerName = existingCustomer.name;
        } else {
            const newCustomer = new Customer({ phone: customerPhone, name: 'guest' });
            await newCustomer.save();
        }

        const orderStatus = status || 'confirmed';
        const determinedPaymentStatus = orderStatus === 'pending' ? 'unpaid' : 'paid';

        const formattedItems = items.map(item => ({
            productId: item._id, 
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0
        }));

        const newOrder = new Order({
            name: customerName,
            phone: customerPhone,
            items: formattedItems,
            deliveryMethod: deliveryMethod || 'takein',
            table: table || 'N/A',
            subTotal: subTotal || 0,
            totalDiscount: totalDiscount || 0,
            totalPrice: totalPrice || 0,
            paymentMethod: paymentMethod || 'Cash',
            status: orderStatus,
            transactionId: transactionId || '',
            paymentStatus: determinedPaymentStatus 
        });

        await newOrder.save();

        return NextResponse.json({
            success: true,
            message: `Order placed for ${customerName}`,
            orderId: newOrder._id
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}


export async function DELETE(req) {
    try {
        await ConnectDB()
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'Id not found'
            }, { status: 400 })
        }

        const order = await Order.findById(id)

        if (!order) {
            return NextResponse.json({
                success: false,
                message: 'Order not found',
            }, { status: 400 })
        }

        await Order.findByIdAndDelete(id)

        return NextResponse.json({ success: true, message: 'Successfully deleted order' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to delete order',
            error: error.message
        }, { status: 500 })

    }

}