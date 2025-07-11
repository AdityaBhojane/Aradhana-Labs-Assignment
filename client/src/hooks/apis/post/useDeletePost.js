import { deletePost } from "@/apis/post";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useDeletePost = (postId) => {
    const token = useAuthStore((state) => state.user.token);
    const queryClient = useQueryClient();
    const { mutateAsync: deletePostRequest, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: () => deletePost(postId, token),
        onSuccess: () => {
            console.log("Post deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['post'] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: (error) => {
            console.error("Failed to delete post:", error);
        }
    });

    return { deletePostRequest, isPending, isSuccess, isError, error };
}