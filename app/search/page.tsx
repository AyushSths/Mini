"use client";
import React, { useEffect, useState, Suspense } from "react";
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

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  if (!query) {
    return <div className="p-4">No search query provided.</div>;
  }

  const [searchItems, setSearchItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // 👈 added state

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true); // start loading
      try {
        const res = await fetch(`https://dummyjson.com/products`);
        const data = await res.json();
        const filteredProducts = data.products.filter(
          (product: Product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        setSearchItems(filteredProducts);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false); // end loading
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className=" min-h-screen">
      <div className="max-w-[1380px] mx-auto px-4 py-8 flex flex-col gap-y-4">
        {loading ? (
          <div>
            <h1 className="opacity-[0.7]">Searching results for "{query}"</h1>
            <div className="flex items-center justify-center h-screen">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        ) : searchItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-700">
              No results found
            </h2>
            <p className="text-gray-500 mt-2">
              We couldn’t find anything matching{" "}
              <span className="font-medium">"{query}"</span>.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="opacity-[0.7] mb-3">
              Found {searchItems.length} results for "{query}"
            </h1>
            <ProductGrid products={searchItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default function PageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
