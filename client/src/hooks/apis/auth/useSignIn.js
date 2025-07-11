import { signin } from "@/apis/auth";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";


export const useSignIn = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const { data,isPending, isSuccess, mutateAsync:signInRequest, isError } = useMutation({
        mutationFn: signin,
        onSuccess: (data) => {
            console.log("Signin successful:", data);
            setUser(data.data);
        },
        onError: (error) => {
            console.error("Signin failed:", error);
        }
    });
    
    return { data,isPending, isSuccess, signInRequest, isError };
}