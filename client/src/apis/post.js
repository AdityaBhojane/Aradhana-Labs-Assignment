import { axiosInstance } from "../config/axiosConfig";


export const createPost = async (postData,token) => {
    try {
            const response = await axiosInstance.post('/posts', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                }
            });
            return response.data; 
        
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};
export const getPosts = async () => {
    try {
        const response = await axiosInstance.get('/posts');
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const getPostById = async (postId, token) => {
    try {
        const response = await axiosInstance.get(`/posts/${postId}`,{
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw error;
    }
};

export const updatePost = async (token, postId, postData) => {
    try {
        const response = await axiosInstance.put(`/posts/${postId}`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token':token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};

export const deletePost = async (postId, token) => {
    try {
        const response = await axiosInstance.delete(`/posts/${postId}`,{
            headers:{
                'token':token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};