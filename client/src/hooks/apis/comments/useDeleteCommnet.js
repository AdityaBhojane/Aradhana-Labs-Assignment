import { deleteComment } from "@/apis/comments";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteComment = (postId) => {
    const token = useAuthStore((state) => state.user.token);
    const queryClient = useQueryClient();
    const { mutateAsync: deleteCommentRequest, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: (commentId)=> deleteComment(token, commentId, postId),
        onSuccess: () => {
            console.log("Comment deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
        onError: (error) => {
            console.error("Failed to delete comment:", error);
        }
    });

    return { deleteCommentRequest, isPending, isSuccess, isError, error };
}