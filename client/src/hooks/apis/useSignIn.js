import { signin } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";


export const useSignIn = () => {
    const { data,isPending, isSuccess, mutateAsync:signInRequest, isError } = useMutation({
        mutationFn: signin,
        onSuccess: (data) => {
            console.log("Signin successful:", data);
        },
        onError: (error) => {
            console.error("Signin failed:", error);
        }
    });
    
    return { data,isPending, isSuccess, signInRequest, isError };
}