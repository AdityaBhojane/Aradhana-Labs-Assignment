import { getComments } from "@/apis/comments";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";


export const useGetComment = (postId) => {
    const token = useAuthStore((state) => state.user.token);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => getComments(token, postId),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return { comments: data, isLoading, isError };
}