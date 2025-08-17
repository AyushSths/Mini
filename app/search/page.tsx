"use client";
import React, { useEffect, useState } from "react";
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

const searchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  if (!query) {
    return <div className="p-4">No search query provided.</div>;
  }
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(`https://dummyjson.com/products`);
      const data = await res.json();
      const filteredProducts = data.products.filter(
        (product: Product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchItems(filteredProducts);
    };

    fetchSearchResults();
  }, [query]);
  console.log("Search results:", searchItems);

  return (
    <div className="pt-4">
      <div className="max-w-[1380px] mx-auto px-4 py-8 flex flex-col gap-y-4">
        <h1 className="opacity-[0.7] ">Found {searchItems.length} results for "{query}"</h1>
        <ProductGrid products={searchItems} />
        {
            searchItems.length === 0 && (
                <div className="text-center text-gray-500 text-2xl mt-4">
                No products found matching your search.
                </div>
            )
        }
      </div>
    </div>
  );
};

export default searchPage;
