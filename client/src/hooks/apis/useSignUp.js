

import { signup } from "@/apis/auth.js";
import { useMutation } from "@tanstack/react-query"

export const useSignUp = () => {
    
    const {isPending, isSuccess, mutateAsync:signUpRequest} = useMutation({
        mutationFn: (email, password, name) => {
            return signup(email, password, name);
        },
        onSuccess: (data) => {
            console.log("Signup successful:", data);
        },
        onError: (error) => {
            console.error("Signup failed:", error);
        }
    });

    return { isPending, isSuccess, signUpRequest  };
}