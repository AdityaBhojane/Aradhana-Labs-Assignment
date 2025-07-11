import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlogImage } from "@/components/BlogImage";
import { toast } from "sonner";
import {
  Send,
  Trash2,
  User,
  Calendar,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function CommentModal({ isOpen, onClose, post, onUpdate }) {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to comment");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment.trim(),
          authorId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add comment");
      }

      const newCommentWithAuthor = {
        ...data,
        author: { id: user.id, name: user.name },
      };

      const updatedPost = {
        ...post,
        comments: [...(post.comments || []), newCommentWithAuthor],
      };

      onUpdate(updatedPost);
      setNewComment("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete comment");
      }

      const updatedPost = {
        ...post,
        comments: post.comments.filter((comment) => comment.id !== commentId),
      };

      onUpdate(updatedPost);
      toast.success("Comment deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Comments</span>
            </DialogTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/post/${post.id}`}>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col space-y-4 overflow-hidden">
          {/* Post Preview */}
          <Card className="flex-shrink-0">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <BlogImage
                  src={post.image}
                  alt={post.caption}
                  className="w-20 h-20 rounded-lg flex-shrink-0"
                  fallbackClassName="rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold line-clamp-1 mb-2">
                    {post.caption}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <User className="w-3 h-3" />
                    <span>{post.author?.name || "Anonymous"}</span>
                    <span>•</span>
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.text.substring(0, 150)}...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Comment Form */}
          {user ? (
            <Card className="flex-shrink-0">
              <CardContent className="p-4">
                <form onSubmit={handleAddComment} className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px] resize-none"
                        maxLength={500}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {newComment.length}/500 characters
                    </span>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={
                        loading || !newComment.trim() || newComment.length > 500
                      }
                    >
                      <Send className="w-4 h-4 mr-1" />
                      {loading ? "Posting..." : "Post Comment"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex-shrink-0">
              <CardContent className="p-4 text-center">
                <p className="text-muted-foreground mb-4">
                  Sign in to join the conversation
                </p>
                <Button asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Comments List */}
          <Card className="flex-1 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">
                {post.comments?.length || 0} Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {comment.author?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">
                              {comment.author?.name || "Anonymous"}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">
                                {formatDate(comment.createdAt)}
                              </span>
                              {user &&
                                user.id === comment.authorId && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteComment(comment.id)
                                    }
                                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                )}
                            </div>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-medium mb-1">No comments yet</p>
                    <p className="text-sm">
                      Be the first to share your thoughts!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
