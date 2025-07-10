import { postRepository } from "../repository/postRepository.js";

export const postService = {
    createPost: async (postData) => {
        try {
            if (!postData.title || !postData.text) {
                throw new Error("All fields are required");
            }
            const response = await postRepository.create(postData);
            return response;
        } catch (error) {
            console.log("Error in postService.createPost:", error);
            throw new Error("Failed to create post");
        }
    },
    getPostById: async (postId) => {
        try {
            if (!postId) {
                throw new Error("Post ID is required");
            }
            const post = await postRepository.findById(postId);
            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        } catch (error) {
            console.log("Error in postService.getPostById:", error);
            throw new Error("Failed to get post");
        }
    },
    // get all posts paginated
    getAllPosts: async (page = 1, limit = 10) => {
        try {
            const response = await postRepository.getPaginatedPosts(page, limit);
            if (!response || response.length === 0) {   
                throw new Error("No posts found");
            }           
            return response;
        } catch (error) {
            console.log("Error in postService.getAllPosts:", error);
            throw new Error("Failed to get posts");
        }
    },

    updatePost: async (postId, postData) => {
        try {
            if (!postId || !postData) {
                throw new Error("Post ID and data are required");
            }
            const updatedPost = await postRepository.update(postId, postData);
            if (!updatedPost) {
                throw new Error("Post not found or update failed");
            }
            return updatedPost;
        } catch (error) {
            console.log("Error in postService.updatePost:", error);
            throw new Error("Failed to update post");
        }
    },
    deletePost: async (postId) => {
        try {
            if (!postId) {
                throw new Error("Post ID is required");
            }
            const deletedPost = await postRepository.delete(postId);
            if (!deletedPost) {
                throw new Error("Post not found or delete failed");
            }
            return deletedPost;
        } catch (error) {
            console.log("Error in postService.deletePost:", error);
            throw new Error("Failed to delete post");
        }
    }
}