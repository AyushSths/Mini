"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Order = {
  total: number;
  subtotal: number;
  shippingFee: number;
};

type selectedItems={
   id: string;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
    brand: string;
}

type ChkbtnProps = {
  order: Order;
  items: selectedItems[];
};

const Chkbtn: React.FC<ChkbtnProps> = ({ order, items })  => {
  const handleClick = () => {
    console.log(order);
    localStorage.setItem("checkout", JSON.stringify(order));
    localStorage.setItem("selectedItems", JSON.stringify(items));
    
  };
  return (
    <div className=" flex md:justify-center">
      {order.total <= 0 ? (
        <Button
          className="w-full"
          onClick={() => {
            alert("Please click the products you want to checkout");
          }}
        >
          PROCEED TO CHECKOUT
        </Button>
      ) : (
        <Link href="/cart/checkout" className="w-full">
          <Button
            className="w-full"
            onClick={() => {
              handleClick();
            }}
          >
            PROCEED TO CHECKOUT
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Chkbtn;
