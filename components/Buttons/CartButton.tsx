"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Settings } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const CartButton = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="flex items-center gap-x-5">
      <Link href="/cart">
        <Button className="cursor-pointer relative z-0 bg-slate-700 hover:bg-slate-800">
          {cart?.length == 0 ? (
            " "
          ) : (
            <p className="absolute top-[-7px] -right-3 text-center z-10 bg-red-700 rounded-[50%] px-2 md:text-base text-sm">
              {cart?.length}
            </p>
          )}
          <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
        </Button>
      </Link>

      <Link
        href="/login"
        className="ml-auto hover:bg-slate-800 bg-slate-700 p-2.5 rounded-lg"
      >
        <Settings size={18} />
      </Link>
    </div>
  );
};

export default CartButton;
