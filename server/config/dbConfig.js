import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { serverConfig } from './serverConfig.js';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(serverConfig.dbUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}