
import { updatePost } from "@/apis/post";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useUpdatePosts = (postId) => {
    const token = useAuthStore((state) => state.user.token);
    const queryClient = useQueryClient();
    const { mutateAsync: updatePostRequest, isLoading, isError, isSuccess} = useMutation({
        mutationFn: (data) => updatePost(token, postId, data),
        onSuccess: (data) => {
            console.log("Post updated successfully:", data);
            queryClient.invalidateQueries({ queryKey: ['post'] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: (error) => {
            console.error("Failed to update post:", error);
        }
    });

    return { updatePostRequest, isLoading, isError, isSuccess };
}