import { postRepository } from "../repository/postRepository.js";

export const likeService = {
    likePost: async (postId, userId) => {
        try {
            if (!postId || !userId) {
                throw new Error("Post ID and User ID are required");
            }
            const response = await postRepository.likePost(postId, userId);
            return response;
        } catch (error) {
            console.log("Error in likeService.likePost:", error);
            throw new Error("Failed to like post");
        }
    },
    unlikePost: async (postId, userId) => {
        try {
            if (!postId || !userId) {
                throw new Error("Post ID and User ID are required");
            }
            const response = await postRepository.unlikePost(postId, userId);
            return response;
        } catch (error) {
            console.log("Error in likeService.unlikePost:", error);
            throw new Error("Failed to unlike post");
        }
    },
    getLikesByPostId: async (postId) => {
        try {
            if (!postId) {
                throw new Error("Post ID is required");
            }
            const response = await postRepository.getLikesByPostId(postId);
            return response;
        } catch (error) {
            console.log("Error in likeService.getLikesByPostId:", error);
            throw new Error("Failed to get likes");
        }
    }
}