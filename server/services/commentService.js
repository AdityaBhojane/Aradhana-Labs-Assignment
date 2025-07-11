import mongoose from "mongoose";
import { commentRepository } from "../repository/commentRepository.js";
import { userRepository } from "../repository/userRepository.js";
import { postRepository } from "../repository/postRepository.js";


export const commentService = {
    addComment: async (postId, userId, content) => {
        try {
            if (!postId || !userId || !content) {
                throw new Error("Post ID, User ID, and content are required");
            }
            const isUserExists = await userRepository.findUserById(userId);
            if (!isUserExists) { 
                throw new Error("User not found");
            }
            const isPostExists = await postRepository.findPostById(postId);
            if (!isPostExists) {
                throw new Error("Post not found");
            }       
            const response = await commentRepository.create({postId, userId, content});
            isPostExists.comments.push(response._id);
            await isPostExists.save();
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
            const response = await commentRepository.getAllComments(postId);
            return response;
        } catch (error) {
            console.log("Error in commentService.getCommentsByPostId:", error);
            throw new Error("Failed to get comments");
        }
    },
    deleteComment: async (id,userId,postId) => {
        try {
            if (!id) {
                throw new Error("Comment ID is required");
            }
            const isUserExists = await userRepository.findUserById(userId);
            if (!isUserExists) {   
                throw new Error("Comment not found");
            }
            const isPostExists = await postRepository.findPostById(postId);
            if (!isPostExists) {
                throw new Error("Post not found");
            }
            const response = await commentRepository.delete(id);
            if (!response) {
                throw new Error("Failed to delete comment");
            }
            isPostExists.comments = isPostExists.comments.filter(commentId => commentId.toString() !== id.toString());
            await isPostExists.save();
            return response;
        } catch (error) {
            console.log("Error in commentService.deleteComment:", error);
            throw new Error("Failed to delete comment");
        }
    }
}