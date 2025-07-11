import { addLike } from "@/apis/like";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useAddLike = (postId) => {
    const token = useAuthStore((state) => state.user.token);
    const queryClient = useQueryClient();
    const { mutateAsync: addLikeRequest, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: ()=>addLike(token, postId),
        onSuccess: () => {
            console.log("Post liked successfully");
            queryClient.invalidateQueries({
                queryKey: ["posts", postId],
            });
            queryClient.invalidateQueries(["likes", postId]);
        },
        onError: (error) => {
            console.error("Failed to like post:", error);
        }
    });

    return { addLikeRequest, isPending, isSuccess, isError, error };
}