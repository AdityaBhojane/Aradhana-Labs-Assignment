import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Edit, Image as ImageIcon, Save, ArrowLeft } from "lucide-react";
import { BlogImage } from "@/components/BlogImage";

import { useAuthStore } from "@/store/authStore";
import { useUpdatePosts } from "../hooks/apis/post/useUpdatePost";
import { useGetPostById } from "../hooks/apis/post/useGetPostById";


export default function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const { updatePostRequest, isPending: isUpdating, isSuccess, isError } = useUpdatePosts(id);
  const { post, isLoading: loading } = useGetPostById(id);
  if (!user) {
    navigate("/login");
  };
  
  useEffect(() => {
    if (post) {
        setTitle(post.caption || "");
        setContent(post.text || "");
        setImage(post.image || "");
    }
  }, [post, user.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in title and content");
      return;
    }
      try {
    await updatePostRequest({
      caption: title.trim(),
      text: content.trim(),
      image: image.trim() || null,
    });

  } catch (error) {
    toast.error("Something went wrong while updating the post.");
    console.error("Update error:", error);
  }
  };

  useEffect(()=>{
    if(isSuccess) {
      toast.success("Post updated successfully!");
      navigate(`/post/${id}`);
      return;
    }
    if(isError){
      toast.error("Failed to update post. Please try again.");
      return;
    }
  },[isSuccess, isError, navigate, id])

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
            <div className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(`/post/${id}`)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Post
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Edit className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">Edit Post</CardTitle>
              <p className="text-muted-foreground">
                Update your post content • Last updated {formatDate(post.updatedAt)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter an engaging title for your post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
                disabled={isUpdating}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="flex items-center space-x-2">
                <ImageIcon className="w-4 h-4" />
                <span>Featured Image (optional)</span>
              </Label>
              <Input
                id="image"
                type="url"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled={isUpdating}
              />
              {image && (
                <div className="mt-2 max-w-md">
                  <BlogImage
                    src={image}
                    alt="Preview"
                    className="h-48 rounded-lg border"
                    fallbackClassName="rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] resize-none"
                disabled={isUpdating}
                required
              />
              <p className="text-sm text-muted-foreground">
                {content?.length} characters
              </p>
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/post/${id}`)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating || !title.trim() || !content.trim()}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}