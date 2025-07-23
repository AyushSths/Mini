// app/thank-you/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ThankYouPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <CheckCircle size={80} className="text-green-500 mb-6" />
      <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Your order has been placed successfully. We’ll send you an update when
        it ships.
      </p>
      <Button onClick={() => router.push("/")} className="px-6 py-2 text-lg">
        Back to Home
      </Button>
    </div>
  );
};

export default ThankYouPage;
