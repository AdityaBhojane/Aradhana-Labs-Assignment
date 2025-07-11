import { getLikes } from "@/apis/like";
import { useQuery } from "@tanstack/react-query";



export const useGetLikes = (postId) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["likes", postId],
        queryFn: ()=> getLikes(postId),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return { likes: data, isLoading, isError };
}