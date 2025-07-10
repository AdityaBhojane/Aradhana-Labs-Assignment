import { postService } from "../services/postServices.js";


export const createPostController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;
        if(req.file) {
            req.body.image = req.files.path;
        }
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const response = await postService.createPost(title, content, userId);
        return res.status(201).json(response);
    } catch (error) {
        console.error("Error in createPostController:", error);
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
}

export const getAllPostsController = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const posts = await postService.getAllPosts(page, limit);
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error in getAllPostsController:", error);
        return res.status(500).json({ message: "Failed to get posts" });
    }
}

export const updatePostController = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        if (!postId || !title || !content) {
            return res.status(400).json({ message: "Post ID, title, and content are required" });
        }

        const updatedPost = await postService.updatePost(postId, { title, content });
        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error in updatePostController:", error);
        return res.status(500).json({ message: "Failed to update post" });
    }
}

export const deletePostController = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            return res.status(400).json({ message: "Post ID is required" });
        }

        await postService.deletePost(postId);
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error in deletePostController:", error);
        return res.status(500).json({ message: "Failed to delete post" });
    }
}