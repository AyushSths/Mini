import React from "react";
import ProductGrid from "./ProductGrid"; // 👈 adjust path if needed
import Categories from "./Categories";

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

const ProductCard = async () => {
  const res = await fetch("https://dummyjson.com/products");
  // const res = await fetch("https://api.freeapi.app/api/v1/public/randomproducts");
  const data = await res.json();
  console.log(data);

  const products: Product[] = data.products;

  return (
    <>
      <Categories />
      <p className="px-3 mb-5 md:text-3xl text-2xl font-bold">All Products</p>
      <ProductGrid products={products} />
    </>
  );
};

export default ProductCard;
