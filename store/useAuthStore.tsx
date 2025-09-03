"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  login: (router?: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (router?: any) => {
        set({ isAuthenticated: true });
        if (router) router.push("/admin/dashboard");
      },
      logout: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "admin-auth", // key in localStorage
    }
  )
);
