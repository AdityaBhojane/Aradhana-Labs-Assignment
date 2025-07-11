import { create } from "zustand";

// Zustand store for authentication state with local storage to store token and data
export const useAuthStore = create((set) => ({
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
}))