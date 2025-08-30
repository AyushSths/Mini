"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddBtn from "../../AddBtn";
import StarRating from "../../../../components/StarRating";
import ProductGrid from "@/components/ProductGrid";
import { useParams } from "next/navigation";

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

const ProductDetail = () => {
  const [prod, setProduct] = useState<any>();
  const [similarProducts, setSimilarProducts] = useState([]);
  const { id } = useParams();

   useEffect(() => {
    if (!id) return;

    // fetch main product
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data: Product = await res.json();
      setProduct(data);

      // fetch similar products
      const res2 = await fetch("https://dummyjson.com/products");
      const allProducts = await res2.json();
      const items = allProducts.products.filter(
        (product: Product) =>
          product.category === data.category && product.id !== data.id
      );
      setSimilarProducts(items);
    };

    fetchProduct();
  }, [id]);

//   useEffect(() => {
//     // const fetchProduct = async () => {
//     //   const res = await fetch("https://dummyjson.com/products");
//     //   const data = await res.json();

//     //   console.log(data);
//     //   const products: Product[] = data.products;
//     // };
    
//     const saved = localStorage.getItem("selectedProduct");
//     if (saved) {
//       setProduct(JSON.parse(saved));
//     }
//     if (!prod) return;

//     // fetchProduct();

//   const fetchSimilarProducts = async () => {
//     const res = await fetch("https://dummyjson.com/products");
//     const data = await res.json();
//     const items = data.products.filter(
//       (product: Product) =>
//         product.category === prod.category && product.id !== prod.id
//     );
//     console.log("similarProducts", items);

//     setSimilarProducts(items);
//   };

//   fetchSimilarProducts();
// }, [prod?.category, prod?.id]);

  if (!prod) return <div className="p-4">Loading product...</div>;

  return (
    <div className="h-full">
      <div className="lg:px-15 px-5 pt-10 max-w-[1480px] m-auto">
        <p className="text-sm font-semibold opacity-60">
          <Link href="/">Home</Link> &gt; Product &gt; {prod.title}
        </p>
        <div className="grid lg:grid-cols-2 gap-10 mt-10 bg-white p-7 rounded-md shadow-lg">
          <div className="flex justify-center">
            <img
              src={prod.thumbnail}
              alt={prod.title}
              className="xl:w-[80%] w-full object-contain rounded-md"
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{prod.title}</h1>
            <p className="mt-3">{prod.description}</p>
            <p className="mt-3 opacity-70">Brand: {prod.brand}</p>
            <p className="mt-3 opacity-70">Stock:({prod.stock})</p>
            <div className="mt-3 opacity-70">
              <StarRating rating={prod.rating} />
            </div>
            <p className="my-5 py-5 border-y-2 text-2xl text-red-600 font-semibold">
              Rs. {prod.price}
            </p>
            <AddBtn
              product={{
                id: prod.id,
                title: prod.title,
                price: prod.price,
                description: prod.description,
                brand: prod.brand,
                thumbnail: prod.thumbnail,
              }}
            />
          </div>
        </div>
        <div className="py-10">
          <h2 className="text-3xl font-bold my-8 px-5">Similar Products</h2>
          <ProductGrid products={similarProducts}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
