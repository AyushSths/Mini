"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import Quantity from "./Quantity";

type Product = {
  id: string;
  title: string;
  price: number;
  description:string;
  brand:string;
  thumbnail: string;
};
const AddBtn = ({ product }: { product: Product }) => {
    const [quantity, setQuantity] = useState(1);
  
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    console.log("clicked add to cart");
    addToCart({ ...product, quantity });
    toast.success(`${product.title} added to cart`, {
      description: `Qty: ${quantity} | Rs. ${product.price}`,
    });

    
  };
  return (
    <div>
      <Quantity quantity={quantity} setQuantity={setQuantity}/>
      <Button
        onClick={() => {
          handleAdd();
        }}
        className="md:w-1/2 w-full py-6 text-lg cursor-pointer"
      >
        Add to cart
      </Button>
    </div>
  );
};

export default AddBtn;
