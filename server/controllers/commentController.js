import { commentService } from "../services/commentService.js";


export const addCommentController = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const userId = req.user.userId;
        console.log("postId:", postId, "content:", content, "userId:", userId);
        if (!postId || !content) {
            return res.status(400).json({ message: "Post ID and content are required" });
        }

        const response = await commentService.addComment(postId, userId, content);
        return res.status(201).json(response);
    } catch (error) {
        console.error("Error in addCommentController:", error);
        return res.status(500).json({ message: "Failed to add comment" });
    }
};

export const getCommentsByPostIdController = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required" });
        }

        const comments = await commentService.getCommentsByPostId(postId);
        return res.status(200).json(comments);
    } catch (error) {
        console.error("Error in getCommentsByPostIdController:", error);
        return res.status(500).json({ message: "Failed to get comments" });
    }
};

export const deleteCommentController = async (req, res) => {
    try {
        const { commentId, postId } = req.params;
        console.log("commentId:", req.params);
        if (!commentId) {
            return res.status(400).json({ message: "Comment ID is required" });
        }
        const userId = req.user.userId;
        if (!commentId) {
            return res.status(400).json({ message: "Comment ID is required" });
        }

        const response = await commentService.deleteComment(commentId, userId, postId);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in deleteCommentController:", error);
        return res.status(500).json({ message: "Failed to delete comment" });
    }
};