"use client";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: (router?: any) => {
    localStorage.setItem("admin-auth", "true");
    set({ isAuthenticated: true });
    if (router) router.push("/admin/dashboard");
  },
  logout: () => {
    localStorage.removeItem("admin-auth");
    set({ isAuthenticated: false });
  },
  initializeAuth: () => {
    const value = localStorage.getItem("admin-auth");
    set({ isAuthenticated: value === "true" });
  },
}));
