import { axiosInstance } from "../config/axiosConfig";


export const addLike = async (token,postId) => {
    try {
        const response = await axiosInstance.post(`/likes/${postId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding like:", error);
        throw error;
        
    }
};

export const removeLike = async (token,postId,likeId) => {
    try {
        const response = await axiosInstance.delete(`/likes/${postId}/${likeId}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
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
        const response = await axiosInstance.get(`/likes/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching likes:", error);
        throw error;
    }
};