import React from "react";
import ProductGrid from "./ProductGrid"; // 👈 adjust path if needed

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  images: string;
  thumbnail: string;
};

const ProductCard = async () => {
  const res = await fetch("https://api.freeapi.app/api/v1/public/randomproducts");
  const data = await res.json();
  const products: Product[] = data.data.data;

  return <ProductGrid products={products} />;
};

export default ProductCard;
