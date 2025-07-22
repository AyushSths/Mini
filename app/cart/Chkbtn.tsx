"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Order = {
  total: number;
  subtotal: number;
  shippingFee: number;
};

const Chkbtn = ({ order }: { order: Order }) => {
  const handleClick = () => {
    console.log(order);
    localStorage.setItem("checkout", JSON.stringify(order));
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
