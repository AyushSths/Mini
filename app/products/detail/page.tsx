"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddBtn from "../AddBtn";

const ProductDetail = () => {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedProduct");
    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  if (!product) return <div className="p-4">Loading product...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="lg:px-15 px-5 pt-15 max-w-[1480px] m-auto">
        <p className="text-sm font-semibold opacity-60">
          <Link href="/">Home</Link> &gt; Product &gt; {product.title}
        </p>
        <div className="grid lg:grid-cols-2 gap-10 mt-10 bg-white p-7 rounded-md shadow-lg">
          <div className="flex justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="xl:w-[80%] w-full object-contain rounded-md"
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
            <p className="mt-3">{product.description}</p>
            <p className="mt-3 opacity-70">Brand: {product.brand}</p>
            <p className="my-5 py-5 border-y-2 text-2xl text-red-600 font-semibold">
              Rs. {product.price}
            </p>
            <AddBtn
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                brand: product.brand,
                thumbnail: product.thumbnail,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
