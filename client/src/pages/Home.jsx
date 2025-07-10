import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Calendar,
  User,
  Heart,
  MessageCircle,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { BlogImage } from "@/components/BlogImage";
import { CommentModal } from "@/components/CommentModal";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [likingPosts, setLikingPosts] = useState({});
  const { user, isAuthenticated } = useAuth();



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const handleLike = async (post) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to like posts");
      return;
    }

    setLikingPosts((prev) => ({ ...prev, [post.id]: true }));

    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to toggle like");
      }

      // Update the posts state with new like count
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id
            ? {
                ...p,
                likesCount: data.liked
                  ? (p.likesCount || 0) + 1
                  : Math.max((p.likesCount || 0) - 1, 0),
              }
            : p,
        ),
      );

      toast.success(data.liked ? "Post liked!" : "Like removed");
    } catch (error) {
      toast.error(error.message);
    }

    setLikingPosts((prev) => ({ ...prev, [post.id]: false }));
  };

  const openCommentModal = (post) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to view comments");
      return;
    }
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts((posts) =>
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[600px] mx-auto mb-8" />
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full rounded-t-lg" />
              <CardHeader>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to BlogSpace
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover amazing stories, share your thoughts, and connect with
          writers from around the world.
        </p>
        {isAuthenticated ? (
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/create">
              <PlusCircle className="mr-2 h-5 w-5" />
              Write Your Story
            </Link>
          </Button>
        ) : (
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/register">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        )}
      </div>

      {/* Featured Posts */}
      {posts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="flex flex-col">
                <Card className="group hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full">
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    className="flex-shrink-0"
                  />
                  <CardHeader className="pb-3 flex-shrink-0">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <User className="w-4 h-4" />
                      <span>{post.author?.name || "Anonymous"}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0 flex-grow flex flex-col">
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {truncateContent(post.content)}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleLike(post);
                          }}
                          disabled={likingPosts[post.id]}
                          className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Heart className="w-4 h-4" />
                          <span>{post.likesCount || 0}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            openCommentModal(post);
                          }}
                          className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments?.length || 0}</span>
                        </button>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/post/${post.id}`}>
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={selectedPost}
        onUpdate={handlePostUpdate}
      />

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <PlusCircle className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">No posts yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Be the first to share your story! Create a new post and start the
            conversation.
          </p>
          {isAuthenticated ? (
            <Button asChild>
              <Link to="/create">Write First Post</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to="/register">Join Now</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
