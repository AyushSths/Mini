"use client";
import React from "react";
import { Filter } from "lucide-react";
import { useRouter } from "next/navigation";

const FilterButton = () => {
  const router = useRouter();

  return (
    <button
      className="opacity-80 text-base font-normal flex gap-x-2 items-center mx-5 px-3 py-2 bg-emerald-600 bg-opacity-50 rounded-lg hover:bg-emerald-700 transition-colors duration-200 cursor-pointer text-white"
      onClick={() => router.push("/products/filter")}
    >
      <Filter size={16} className="text-base text-white" />
      Filter
    </button>
  );
};

export default FilterButton;
