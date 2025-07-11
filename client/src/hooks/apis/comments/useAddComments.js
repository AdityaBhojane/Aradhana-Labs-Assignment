import { addComment } from "@/apis/comments";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useAddComments = (postId) => {
    const queryClient = useQueryClient();
    const token = useAuthStore((state) => state.user.token);
    const { mutateAsync: addCommentRequest, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: (content) => addComment(token, postId, content),
        onSuccess: () => {
            console.log("Comment added successfully");
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
        onError: (error) => {
            console.error("Failed to add comment:", error);
        }
    });

    return { addCommentRequest, isPending, isSuccess, isError, error };
}