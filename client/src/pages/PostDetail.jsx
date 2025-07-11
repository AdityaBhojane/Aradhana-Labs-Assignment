import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
import {
  Calendar,
  User,
  Heart,
  MessageCircle,
  Edit,
  Trash2,
  Send,
  ArrowLeft,
} from "lucide-react";
import { BlogImage } from "@/components/BlogImage";
import { useGetPostById } from "../hooks/apis/post/useGetPostById";
import { useAuthStore } from "../store/authStore";
import { useDeletePost } from "../hooks/apis/post/useDeletePost";
import { useAddLike } from "../hooks/apis/likes/useAddLike";
import { useRemoveLike } from "../hooks/apis/likes/useRemoveLike";
import { useGetLikes } from "../hooks/apis/likes/useGetLiks";
import { useAddComments } from "../hooks/apis/comments/useAddComments";
import { useDeleteComment } from "../hooks/apis/comments/useDeleteCommnet";
import { useGetComment } from "../hooks/apis/comments/useGetComment";



export default function PostDetail() {
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, isLoading: loading } = useGetPostById(id)
  const { deletePostRequest, isPending: deleteLoading } = useDeletePost(id);
  const { addLikeRequest, isPending: likeLoading } = useAddLike(id);
  const { removeLikeRequest, isPending: unlikeLoading } = useRemoveLike(id);
  const { likes, isLoading: likesLoading } = useGetLikes(id);
  const { addCommentRequest, isPending: commentLoading } = useAddComments(id);
  const { deleteCommentRequest } = useDeleteComment(id);
  const { comments = [], isLoading: commentsLoading } = useGetComment(id);


  useEffect(() => {
    if (likes && user) {
      const userLiked = likes.filter(like => like.userId === user.id);
      setLiked(userLiked);
    }
  }, [likes, user]);

  const handleDeletePost = async () => {
    if (!user) {
      toast.error("Please sign in to delete posts");
      return;
    }

    try {
      await deletePostRequest();
      toast.success("Post deleted successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Failed to delete post");
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please sign in to like posts");
      return;
    }

    try {
      if (liked.length) {
        await removeLikeRequest(liked[0]._id);
        toast.success("Post unliked!");
      } else {
        await addLikeRequest();
        toast.success("Post liked!");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to toggle like");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to comment");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await addCommentRequest(newComment);
      toast.success("Comment added successfully!");
      // setNewComment("");
    } catch (error) {
      toast.error(error?.message || "Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) {
      toast.error("Please sign in to delete comments");
      return;
    }

    try {
      console.log(commentId)
      await deleteCommentRequest(commentId);
      toast.success("Comment deleted successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to delete comment");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-8 w-32 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The post you're looking for doesn't exist or has been deleted.
          </p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const likesCount = likes?.length || 0;
  const commentsCount = comments?.length || 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{post.user?.username?.toUpperCase() || "Anonymous"}</span>
              <span>•</span>
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
              {post.updatedAt !== post.createdAt && (
                <>
                  <span>•</span>
                  <span className="text-xs">(edited)</span>
                </>
              )}
            </div>
            {user && user.id === post.user._id && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/edit/${post._id}`}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      disabled={deleteLoading}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Post</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this post? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeletePost}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold">{post.caption}</h1>
        </CardHeader>
        <CardContent>
          <BlogImage
            src={post.image}
            alt={post.caption}
            className="rounded-lg mb-6 h-64"
            fallbackClassName="rounded-lg mb-6"
          />
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap">{post.text}</p>
          </div>
          <div className="flex items-center space-x-4 mt-6 pt-6 border-t">
            <Button
              variant={liked.length>0 ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              disabled={likeLoading || unlikeLoading || likesLoading}
              className="flex items-center space-x-1 cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${liked.length > 0 ? "fill-current" : ""}`} />
              <span>
                {likesLoading ? "..." : likesCount}
              </span>
            </Button>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>
                {commentsLoading ? "..." : commentsCount} comments
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">
            Comments ({commentsLoading ? "..." : commentsCount})
          </h3>
        </CardHeader>
        <CardContent>
          {/* Add Comment Form */}
          {user ? (
            <form onSubmit={handleAddComment} className="mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2"
                    disabled={commentLoading}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={commentLoading || !newComment.trim()}
                  >
                    <Send className="w-4 h-4 mr-1" />
                    {commentLoading ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 border rounded-lg mb-6">
              <p className="text-muted-foreground mb-4">
                Sign in to join the conversation
              </p>
              <Button asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          )}

          {/* Comments List */}
          {commentsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-16 w-full rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    {comment.userId?.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm ">
                          @{comment.userId?.username || "Anonymous"}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(comment.createdAt)}
                          </span>
                          {user && user.id === comment.userId._id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteComment(comment._id)}
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive cursor-pointer"
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
              ))}
              {comments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No comments yet. Be the first to share your thoughts!
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}