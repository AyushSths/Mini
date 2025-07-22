"use client";
import React, { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

type Product = {
  id: string;
  quantity: number;
};

const CartQuantity = ({ product }: { product: Product }) => {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const item = cart.find((item) => item.id === product.id);
  const quantity = item?.quantity || 1;

  const increment = () => {
    if (item) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const decrement = () => {
    if (item && quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  return (
    <div className="">
      <div className="btns flex">
        <Button
          onClick={decrement}
          className="text-base px-4 text-center cursor-pointer"
        >
          -
        </Button>
        <Input
          type="text"
          className="w-1/2 md:w-1/5 text-center border-none"
          value={quantity}
          readOnly
        />
        <Button
          onClick={increment}
          className="text-base px-4 text-center cursor-pointer"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default CartQuantity;
