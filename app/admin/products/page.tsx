"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  title: string;
  price: number;
  brand: string;
  thumbnail: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/randomproducts"
      );
      const data = await res.json();
      setProducts(data?.data.data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto rounded-lg  p-6 px-0">
        <h2 className="text-3xl font-semibold mb-4">All Products</h2>
        <div className="  max-h-[680px] overflow-x-scroll shadow-md rounded border">
          <table className="min-w-full bg-white text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Price (Rs)</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{i + 1}</td>
                  <td className="p-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-12 w-12 object-contain"
                    />
                  </td>
                  <td className="p-4">{product.title}</td>
                  <td className="p-4">{product.brand}</td>
                  <td className="p-4 semi-bold">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
