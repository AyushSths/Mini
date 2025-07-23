"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Settings  } from "lucide-react";

const CartButton = () => {
  return (
    <div className="flex items-center gap-x-5">
      <Link href="/cart">
        <Button
          onClick={() => {
            console.log("Click");
          }}
          className="cursor-pointer bg-slate-700 "
        >
          <FontAwesomeIcon icon={faShoppingCart} className="" />
        </Button>
      </Link>
      <Link
        href="/login"
        className="ml-auto hover:bg-slate-800 bg-slate-700 p-3 rounded-lg"
      >
        <Settings  size={18}  />
      </Link>
    </div>
  );
};

export default CartButton;
