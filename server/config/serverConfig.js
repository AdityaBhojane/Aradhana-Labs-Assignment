import dotenv from 'dotenv';
dotenv.config();

export const serverConfig = {
    port: process.env.PORT,
    dbUri: process.env.DB_URI || "mongodb://localhost:27017/aditya_labs",
    jwtSecret: process.env.JWT_SECRET || "your_jwt_secret"
}