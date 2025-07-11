import { createPost } from "@/apis/post";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useAddPost = () => {
    const token = useAuthStore((state) => state.user.token);
    const queryClient = useQueryClient();
    const { mutateAsync: addPostRequest, isPending, isSuccess, isError, error, data } = useMutation({
        mutationFn: (data) => createPost(data, token),
        onSuccess: (data) => {
            console.log("Post added successfully:", data);
            queryClient.invalidateQueries({ queryKey: ['post'] });
            queryClient.invalidateQueries({ queryKey: ['posts'] }); 
        },
        onError: (error) => {
            console.error("Failed to add post:", error);
        }
    });

    return { addPostRequest, isPending, isSuccess, isError, error, data };
}