import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { PenTool, Image as ImageIcon, Send, X } from "lucide-react";
import { BlogImage } from "@/components/BlogImage";
import { useAddPost } from "../hooks/apis/post/useAddPost";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [fileError, setFileError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setImageFile(URL.createObjectURL(file));
      setImageURL(file)
      setFileError("");
    } else {
      setImageFile(null);
      setFileError("Please upload an image smaller than 2MB.");
    }
  };

  const handleRemoveImage = () => {
    setImageURL("");
    setImageFile(null);
    setFileError("");
  };

  const { addPostRequest, isPending: loading, isSuccess, isError, data} = useAddPost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in title and content");
      return;
    }
    console.log("Submitting post:", { title, content, image: imageFile || imageURL });
    await addPostRequest({
      caption: title,
      text: content,
      image: imageURL || "",
    });
    console.log("Post submitted:", { title, content, image: imageFile || imageURL });
  };

  console.log(data)

  useEffect(() => {
      if (isError) {
        toast.error("Failed to create post. Please try again.");
      }
      if (isSuccess && data) {
        toast.success("Post created successfully!");
        navigate(`/post/${data?._id}`);
      }
  }, [isSuccess, isError, data, navigate]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <PenTool className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">Create New Post</CardTitle>
              <p className="text-muted-foreground">
                Share your thoughts with the world
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
                required
                minLength={5}
              />
            </div>

            <Label
              htmlFor="image-file"
              className="flex items-center space-x-2 pt-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Or upload an image (max 2MB)</span>
            </Label>
            <Input
              id="image-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {fileError && <p className="text-sm text-red-500">{fileError}</p>}

            {(imageURL || imageFile) && (
              <div className="mt-2 max-w-md flex items-center relative">
                <BlogImage
                  src={imageFile || imageURL}
                  alt="Preview"
                  className="h-48 rounded-lg border"
                  fallbackClassName="rounded-lg border"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white text-gray-600 rounded-full p-1 hover:bg-gray-200"
                  title="Remove image"
                >
                  <X className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] resize-none"
                required
                minLength={10}
              />
              <p className="text-sm text-muted-foreground">
                {content.length} characters
              </p>
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Publishing..." : "Publish Post"}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
