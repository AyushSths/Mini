"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartButton = () => {
  return (
    <div>
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
    </div>
  );
};

export default CartButton;
