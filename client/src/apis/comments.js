import { axiosInstance } from "../config/axiosConfig";


export const addComment = async (token, postId, content) => {
    try {
        console.log(content)
        const response = await axiosInstance.post(`/comments/${postId}`, {content}, {
            headers: {
                'token':token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

export const getComments = async (token, postId) => {
    try {
        const response = await axiosInstance.get(`/comments/${postId}`, {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

export const deleteComment = async (token, commentId, postId) => {
    try {
        const response = await axiosInstance.delete(`/comments/${commentId}/${postId}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
}