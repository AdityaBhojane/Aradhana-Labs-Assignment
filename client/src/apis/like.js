import { axiosInstance } from "../config/axiosConfig";


export const addLike = async (postId) => {
    try {
        const response = await axiosInstance.post(`/posts/${postId}/like`, {}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding like:", error);
        throw error;
        
    }
};

export const removeLike = async (postId) => {
    try {
        const response = await axiosInstance.delete(`/posts/${postId}/like`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing like:", error);
        throw error;
    }
};

export const getLikes = async (postId) => {
    try {
        const response = await axiosInstance.get(`/posts/${postId}/likes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching likes:", error);
        throw error;
    }
};