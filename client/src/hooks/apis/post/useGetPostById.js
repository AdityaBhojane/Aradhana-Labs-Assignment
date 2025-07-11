import { getPostById } from "@/apis/post";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export const useGetPostById = (postId) => {
    const token = useAuthStore((state) => state.user.token);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId, token),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { post: data, isLoading, isError };
}