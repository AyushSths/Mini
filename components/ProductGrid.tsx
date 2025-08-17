"use client";

import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import StarRating from "@/components/StarRating";

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

const ProductGrid = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  const handleViewProduct = (product: Product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push(`/products/detail/${product.id}`);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 md:gap-6 gap-3 px-3 ">
        {products.map((item) => (
          <Card
            key={item.id}
            className="group flex flex-col pt-0 transform duration-150 ease-in hover:bg-gray-200 h-full shadow-lg cursor-pointer"
            onClick={() => handleViewProduct(item)}
          >
            <div className="flex justify-center">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="rounded-t-lg w-full object-contain transform duration-150 ease-in drop-shadow-lg drop-shadow-gray-500 group-hover:scale-[1.05]"
              />
            </div>
            <CardHeader className="h-full">
              <CardTitle className="md:text-base text-[13px] opacity-[0.7]">
                {item.title}
              </CardTitle>
              <CardDescription className="md:text-xl text-base text-red-600">
                Rs.{item.price}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-gray-400 text-sm flex items-center gap-x-2"> <StarRating rating={item.rating}/>{item.rating}</div>
              {/* <p className="text-gray-400 text-sm">{item.category}</p> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
