import { cookies } from "next/headers";
import { JWT_SECRET } from "../database/secret";
import Staff from "../models/staff";
import jwt from 'jsonwebtoken'
import ConnectDB from "../database/mongo";
import { NextResponse } from "next/server";


async function getAuthenticatedStaff() {
    try {
        await ConnectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get('staff_token')?.value;

        if (!token) return null;

        const decoded = jwt.verify(token, JWT_SECRET);
        const staff = await Staff.findById(decoded.id).select("-password").lean();
        return staff || null;
    } catch (error) {
        return null;
    }
}

export async function isStaff() {
    try {
        const staff = await getAuthenticatedStaff()
        if (!staff) {
            return {
                success: false, message: 'Please login'
            }
        }
        return {
            success: true, message: 'successfully logged in', payload: staff
        }
    } catch (error) {
        return {
            success: false, message: error.message
        }
    }

}


export async function isAdmin() {
    try {
        const staff = await getAuthenticatedStaff()
        if (!staff) {
            return {
                success: false, message: 'Please login'
            }
        }

        if(staff.role !== 'admin'){
            return {
                success:false, message:'Only admins are allowed'
            }
        }
        return {
            success: true, message: 'successfully logged in', payload: staff
        }
    } catch (error) {
        return {
            success: false, message: error.message
        }
    }

}
export async function isManager() {
    try {
        const staff = await getAuthenticatedStaff()
        if (!staff) {
            return {
                success: false, message: 'Please login'
            }
        }
        if(staff.role !== 'manager'){
            return {
                success:false, message:'Only managers are allowed'
            }
        }
        return {
            success: true, message: 'successfully logged in', payload: staff
        }
    } catch (error) {
        return {
            success: false, message: error.message
        }
    }

}
export async function isSales() {
    try {
        const staff = await getAuthenticatedStaff()
        if (!staff) {
            return {
                success: false, message: 'Please login'
            }
        }
        if(staff.role !== 'sales'){
            return {
                success:false, message:'Only saless are allowed'
            }
        }
        return {
            success: true, message: 'successfully logged in', payload: staff
        }
    } catch (error) {
        return {
            success: false, message: error.message
        }
    }

}