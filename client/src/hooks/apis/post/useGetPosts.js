import { getPosts } from "@/apis/post";
import { useQuery } from "@tanstack/react-query";


export const useGetPosts = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["posts"],
        queryFn: () => getPosts(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return { posts: data, isLoading, isError };
}