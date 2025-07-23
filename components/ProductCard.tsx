// "use client"
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  images: string;
  thumbnail: string;
};

const ProductCard = async () => {

  const res = await fetch(
    `https://api.freeapi.app/api/v1/public/randomproducts`
  );
  const data = await res.json();
  const products: Product[] = data.data.data;
  console.log(products);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 lg:px-15 px-5">
      {products.map((item,index) => {
        return (
          <Link href={`/products/${item.id}`} key={item.id}>
            <Card className="group flex pt-0 transform duration-150 ease-in hover:bg-gray-200 h-full shadow-lg">
              <div className="flex justify-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="rounded-t-lg w-full object-contain transform duration-150 ease-in group-hover:scale-[1.05]"
                />
              </div>
              <CardHeader className="px-5 h-full ">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="text-xl text-red-600">
                  Rs.{item.price}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.category}</p>
              </CardContent>
              {/* <CardFooter className="">
            <Button className="w-full cursor-pointer">Add to Cart</Button>
          </CardFooter> */}
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductCard;
