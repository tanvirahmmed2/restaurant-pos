import mongoose from "mongoose";
import dns from 'dns';
import { MONGO_URL } from "./secret";

dns.setServers(['8.8.8.8', '8.8.4.4']);

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('MongoDB server connected successfully')
    } catch (error) {
        console.log(error)
        console.log('Failed to connect mongodb')
    }
}

export default ConnectDB