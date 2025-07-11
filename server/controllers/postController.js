import { deleteImageCloudinary } from "../config/cloudinary.js";
import { postRepository } from "../repository/postRepository.js";
import { postService } from "../services/postServices.js";

export const createPostController = async (req, res) => {
  try {
    const { caption, text } = req.body;
    const { userId } = req.user;
    if(!userId){
        throw new Error("User id required")
    };
    req.body.user = userId;
    if (req.file) {
      req.body.image = req.file.path;
      req.body.public_key = req.file.filename;
    }
    if (!caption || !text || !userId) {
      return res
        .status(400)
        .json({ message: "Caption, text, and user ID are required" });
    }

    const response = await postService.createPost(req.body);
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error in createPostController:", error);
    if (req.file || req.file.filename) {
      console.log("deleting image");
      await deleteImageCloudinary(req.file.filename);
    }
    return res.status(500).json({ message: "Failed to create post" });
  }
};

export const getPostByIdController = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }
    const post = await postService.getPostById(postId);
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error in getPostByIdController:", error);
    return res.status(500).json({ message: "Failed to get post" });
  }
};

export const getAllPostsController = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await postService.getAllPosts(page, limit);
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getAllPostsController:", error);
    return res.status(500).json({ message: "Failed to get posts" });
  }
};

export const updatePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption, text } = req.body;
    if (!caption || !text) {
      return res
        .status(400)
        .json({ message: "Post ID, title, and content are required" });
    }
    console.log("image data",req.file)
    if (req.file) {
      req.body.image = req.files.path;
      req.body.public_key = req.file.filename;
    }
    const findPost = await postService.getPostById(postId);
    if (!findPost) {
      return res.status(404).json({ message: "Post not found" });
    }else{
        await deleteImageCloudinary(findPost.public_key);
    }
    const updatedPost = await postService.updatePost(postId, { caption, text });
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error in updatePostController:", error);
    if (req.file || req.file.filename) {
      console.log("deleting image");
      await deleteImageCloudinary(req.file.filename);
    }
    return res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }
    const post = await postRepository.findPostById(postId);
    if(post.public_key){
        await deleteImageCloudinary(post.public_key);
    }
    await postService.deletePost(postId);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePostController:", error);
    return res.status(500).json({ message: "Failed to delete post" });
  }
};
