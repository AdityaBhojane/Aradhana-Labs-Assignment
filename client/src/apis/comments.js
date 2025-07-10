import { axiosInstance } from "../config/axiosConfig";


export const addComment = async (postId, commentData) => {
    try {
        const response = await axiosInstance.post(`/posts/${postId}/comments`, commentData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

export const getComments = async (postId) => {
    try {
        const response = await axiosInstance.get(`/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

export const deleteComment = async (postId, commentId) => {
    try {
        const response = await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
}