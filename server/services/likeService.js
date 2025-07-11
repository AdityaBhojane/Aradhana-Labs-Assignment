import { likeRepository } from "../repository/likeRepository.js";
import { postRepository } from "../repository/postRepository.js";
import { userRepository } from "../repository/userRepository.js";

export const likeService = {
  likePost: async (postId, userId) => {
    try {
      if (!postId || !userId) {
        throw new Error("Post ID and User ID are required");
      }
      const isUserExists = await userRepository.findUserById(userId);
      if (!isUserExists) {
        throw new Error("User not found");
      }
      const isPostExists = await postRepository.findPostById(postId);
      if (!isPostExists) {
        throw new Error("Post not found");
      }
      const response = await likeRepository.create({postId, userId});
      isPostExists.likes.push(response._id);
      await isPostExists.save();
      return response;
    } catch (error) {
      console.log("Error in likeService.likePost:", error);
      throw new Error("Failed to like post");
    }
  },
  unlikePost: async (postId, userId, likeId) => {
    try {
      if (!postId || !userId || !likeId) {
        throw new Error("Post ID, User ID and Like ID are required");
      }
      const isUserExists = await userRepository.findUserById(userId);
      if (!isUserExists) {
        throw new Error("User not found");
      }
      const isPostExists = await postRepository.findPostById(postId);
      if (!isPostExists) {
        throw new Error("Post not found");
      }
      const response = await likeRepository.delete(likeId);
      if (!response) {
        throw new Error("Like not found");
      }
      isPostExists.likes = isPostExists.likes.filter(
        (like) => like.toString() !== likeId.toString()
      );
      await isPostExists.save();
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
      const response = await likeRepository.read({ postId });
      if (!response || response.length === 0) {
        return [];
      }
      return response;
    } catch (error) {
      console.log("Error in likeService.getLikesByPostId:", error);
      throw new Error("Failed to get likes");
    }
  },
};
