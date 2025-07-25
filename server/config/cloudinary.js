import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary
});



export const uploader = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
});


export const deleteImageCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId);
        console.log("cloudinary response", response);
    } catch (error) {
        console.log('unable to delete image', error);
        throw error
    }
};

