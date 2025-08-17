"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Settings } from "lucide-react";
import SearchButton from "./SearchButton";

const CartButton = () => {
  const [cartItems, setCartitems] = useState([]);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const cartData = JSON.parse(savedCart || "[]");
    setCartitems(cartData?.state.cart || []);
  }, []);
  console.log("cart items", cartItems);
  return (
    <div className="flex items-center gap-x-5">
      <SearchButton />
      <Link href="/cart">
        <Button
          onClick={() => {
            console.log("Click");
          }}
          className="cursor-pointer relative z-0 bg-slate-700 hover:bg-slate-800"
          >
          {cartItems?.length==0?" ":<p className="absolute top-[-7px] -right-3 text-center z-10 bg-red-700 rounded-[50%] px-2 md:text-base text-sm">{cartItems.length}</p>}
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
