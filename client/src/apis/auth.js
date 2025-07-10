import { axiosInstance } from "../config/axiosConfig.js";


export const signup = async (email, password, name) => {
    try {
        const response = await axiosInstance.post("/auth/signup", {
            email,
            password,
            name
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error during signup:", error);
        return { success: false, error: "Failed to create account. Please try again." };
        
    }
};

export const signin = async (email, password) => {
    try {
        const response = await axiosInstance.post("/auth/signin", {
            email,
            password
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error during signin:", error);
        return { success: false, error: "Invalid email or password." };
    }
}