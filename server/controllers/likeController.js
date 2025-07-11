import { likeService } from "../services/likeService.js";

export const addLikeController = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const response = await likeService.likePost(postId, userId);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in addLikeController:", error);
    return res.status(500).json({ message: "Failed to like post" });
  }
};

export const removeLikeController = async (req, res) => {
  try {
    const { postId, likeId } = req.params;
    const userId = req.user.userId;
    console.log("userId", userId, "postId", postId);
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const response = await likeService.unlikePost(postId, userId, likeId);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in removeLikeController:", error);
    return res.status(500).json({ message: "Failed to unlike post" });
  }
};

export const getLikesController = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const response = await likeService.getLikesByPostId(postId);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in getLikesController:", error);
    return res.status(500).json({ message: "Failed to get likes" });
  }
};
