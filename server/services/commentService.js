import { commentRepository } from "../repository/commentRepository.js";


export const commentService = {
    addComment: async (postId, userId, content) => {
        try {
            if (!postId || !userId || !content) {
                throw new Error("Post ID, User ID, and content are required");
            }
            const response = await commentRepository.addComment(postId, userId, content);
            return response;
        } catch (error) {
            console.log("Error in commentService.addComment:", error);
            throw new Error("Failed to add comment");
        }
    },
    getCommentsByPostId: async (postId) => {
        try {
            if (!postId) {
                throw new Error("Post ID is required");
            }
            const response = await commentRepository.getCommentsByPostId(postId);
            return response;
        } catch (error) {
            console.log("Error in commentService.getCommentsByPostId:", error);
            throw new Error("Failed to get comments");
        }
    },
    deleteComment: async (commentId) => {
        try {
            if (!commentId) {
                throw new Error("Comment ID is required");
            }
            const response = await commentRepository.deleteComment(commentId);
            return response;
        } catch (error) {
            console.log("Error in commentService.deleteComment:", error);
            throw new Error("Failed to delete comment");
        }
    }
}