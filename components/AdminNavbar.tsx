"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminNavbar() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-emerald-600">
      <div className="flex justify-between items-center p-5  text-white max-w-[1480px] m-auto">
        <h1
          className="text-2xl font-semibold cursor-pointer"
          onClick={() => {
            router.push("/admin/dashboard");
          }}
        >
          Admin Panel
        </h1>
        <Button
          onClick={handleLogout}
          className="bg-gray-100 text-black hover:bg-gray-300"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
