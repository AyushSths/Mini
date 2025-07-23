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

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  images: string;
  thumbnail: string;
};

const ProductGrid = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  const handleViewProduct = (product: Product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push("/products/detail");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 lg:px-15 px-5">
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
              className="rounded-t-lg w-full object-contain transform duration-150 ease-in group-hover:scale-[1.05]"
            />
          </div>
          <CardHeader className="px-5 h-full">
            <CardTitle>{item.title}</CardTitle>
            <CardDescription className="text-xl text-red-600">
              Rs.{item.price}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.category}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
