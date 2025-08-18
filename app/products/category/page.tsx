"use client";
import React, { useEffect, useState, Suspense } from "react";
// import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  images: string;
  thumbnail: string;
  rating: number;
  stock: number;
  discountPercentage: number;
};

const CategoryPage = () => {
  const [catItems, setCatItems] = useState([]);
  const categoryParams = useSearchParams();
  const category = categoryParams.get("category");
  console.log("Category query:", category);
  if (!category) {
    return <div className="p-4">No search query provided.</div>;
  }
  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(`https://dummyjson.com/products`);
      const data = await res.json();
      const filteredProducts = data.products.filter((product: Product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
      setCatItems(filteredProducts);
    };

    fetchSearchResults();
  }, [category]);

  console.log("Category results:", catItems);

  return (
    <div className="pt-4 min-h-screen">
      <div className="max-w-[1380px] mx-auto px-4 py-8 flex flex-col gap-y-4">
        <h1 className="md:text-3xl text-2xl font-extrabold text-white">
          <span className="text-slate-800">{category}</span> Section
        </h1>
        <ProductGrid products={catItems} />
      </div>
    </div>
  );
};

export default function PageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPage />
    </Suspense>
  );
}
