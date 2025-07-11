import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  User,
  Mail,
  Calendar,
  Edit,
  Trash2,
  PlusCircle,
  Heart,
  MessageCircle,
} from "lucide-react";

export default function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated= true;
  const user = { id: 1, name: "John Doe", email: "john@example.com", createdAt: "2023-01-01" };
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch posts");
        }

        // Filter posts by current user
        const userPosts = data.filter((post) => post.authorId === user.id);
        setUserPosts(userPosts);
      } catch (error) {
        toast.error(error.message);
      }
      setLoading(false);
    };

    fetchUserPosts();
  }, [user.id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete post");
      }

      setUserPosts((prev) => prev.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const totalLikes = userPosts.reduce(
    (sum, post) => sum + (post.likesCount || 0),
    0,
  );
  const totalComments = userPosts.reduce(
    (sum, post) => sum + (post.comments?.length || 0),
    0,
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <CardTitle className="text-xl">{user?.name}</CardTitle>
              <p className="text-muted-foreground flex items-center justify-center">
                <Mail className="w-4 h-4 mr-1" />
                {user?.email}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {formatDate(user?.createdAt)}
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{userPosts.length}</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{totalLikes}</div>
                    <div className="text-xs text-muted-foreground">
                      Total Likes
                    </div>
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link to="/create">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New Post
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Content */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">My Posts</h1>
            <Badge variant="secondary">
              {userPosts.length} post{userPosts.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : userPosts.length > 0 ? (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <Card key={post.id} className="group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Published {formatDate(post.createdAt)}
                          {post.updatedAt !== post.createdAt && " • Edited"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/edit/${post.id}`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.content.substring(0, 200)}
                      {post.content.length > 200 ? "..." : ""}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likesCount || 0} likes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments?.length || 0} comments</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="ml-auto"
                      >
                        <Link to={`/post/${post.id}`}>View Post</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <PlusCircle className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">No posts yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't created any posts yet. Start sharing your
                  thoughts!
                </p>
                <Button asChild>
                  <Link to="/create">Create Your First Post</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
