import { removeLike } from "@/apis/like";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useRemoveLike = (postId) => {
    const token = useAuthStore((state) => state.user.token);
    const queryClient = useQueryClient();
    const { mutateAsync: removeLikeRequest, isPending, isSuccess, isError, error } = useMutation({
        mutationFn:(likeId)=> removeLike(token, postId, likeId),
        onSuccess: () => {
            console.log("Post unliked successfully");
            queryClient.invalidateQueries({
                queryKey:["posts", postId],
            });
            queryClient.invalidateQueries(["likes", postId]);
        },
        onError: (error) => {
            console.error("Failed to unlike post:", error);
        }
    });

    return { removeLikeRequest, isPending, isSuccess, isError, error };
}