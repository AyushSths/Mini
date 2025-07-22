"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Quantity = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (val: number) => void;
}) => {
  return (
    <div className="mt-5 mb-8">
      <p className="pb-2 font-medium opacity-80">Quantity :</p>

      <div className="btns flex gap-5">
        <Button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="text-2xl py-6 px-6 text-center cursor-pointer"
        >
          -
        </Button>
        <Input
          disabled
          type="text"
          className="w-1/4 py-6 border-gray-500 text-center "
          value={quantity}
        />
        <Button
          onClick={() => {
            setQuantity(quantity + 1);
          }}
          className="text-2xl py-6 px-6 text-center cursor-pointer"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Quantity;
