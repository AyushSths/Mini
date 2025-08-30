"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  // Render 6 placeholders (same as xl:grid-cols-6)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 md:gap-4 gap-3 px-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col space-y-2 p-2 border rounded-lg shadow-sm"
        >
          {/* Product Image Placeholder */}
          <Skeleton className="h-32 w-full rounded-md" />
          {/* Title */}
          <Skeleton className="h-4 w-3/4" />
          {/* Price */}
          <Skeleton className="h-4 w-1/2" />
          {/* Rating */}
          <Skeleton className="h-3 w-1/4" />
        </div>
      ))}
    </div>
  );
}
