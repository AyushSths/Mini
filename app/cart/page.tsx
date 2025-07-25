"use client";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CartQuantity from "./CartQuantity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Chkbtn from "./Chkbtn";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const { removeFromCart } = useCartStore((state) => state);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheck = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectedItems = cart.filter((item) => checkedItems.includes(item.id));
  console.log("selected items", selectedItems);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = selectedItems.length > 0 ? 100 : 0;
  const total = subtotal + shippingFee;

  useEffect(() => {
    localStorage.setItem(
      "checkout",
      JSON.stringify([subtotal, shippingFee, total])
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="lg:px-15 px-3 max-w-[1480px] m-auto pt-15">
        <p className="md:text-base text-sm font-semibold opacity-60">
          <Link href="/">Home</Link> {">"} Cart
        </p>
        <div className="grid lg:grid-cols-3 grid-rows-1 gap-x-10 gap-y-5 mt-5">
          <section className="flex flex-col lg:col-span-2 bg-white rounded-md shadow-lg p-5 pb-8">
            <h2 className="text-xl font-bold text-slate-700 mb-3">
              My Cart ({cart.length})
            </h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item, index) => {
                return (
                  <div
                    className="flex border-b-2 p-1 pb-3 md:p-3 items-center md:gap-x-10 gap-x-2"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={checkedItems.includes(item.id)}
                      onChange={() => handleCheck(item.id)}
                    />
                    <div className="grid grid-cols-2 md:gap-x-50 gap-x-20 items-center">
                      <div className="flex gap-4 ">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-20 rounded-lg"
                        />
                        <div>
                          <p className="font-semibold md:text-xl">
                            {item.title}
                          </p>
                          <p className="font-medium opacity-70 text-sm">
                            {item.brand}
                          </p>
                          <p className="font-bold text-lg text-red-500 md:mt-1">
                            Rs.{item.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-end md:flex-row flex-col-reverse gap-y-10">
                        <CartQuantity
                          product={{ quantity: item.quantity, id: item.id }}
                        />
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="text-gray-600 text-xl"
                          onClick={() => {
                            removeFromCart(item.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </section>
          <section className="px-8 bg-white rounded-md shadow-lg p-5 max-h-[300px]">
            <p className="font-bold text-2xl">Order Summmary</p>
            {
              <div className="order-info text-lg flex flex-col gap-y-5 mt-3">
                <div className="flex justify-between">
                  <p className="opacity-70">
                    Subtotal (
                    {selectedItems.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                    )
                  </p>
                  <p>Rs.{subtotal}</p>
                </div>
                <div className="flex justify-between">
                  <p className="opacity-70">Shipping fee</p>
                  <p>Rs.{shippingFee}</p>
                </div>
                <div className="flex justify-between">
                  <p>Total</p>
                  <p className="text-xl text-red-500 font-semibold">
                    Rs.{total}
                  </p>
                </div>
              </div>
            }
            <div className="mt-5">
              <Chkbtn
                order={{
                  total: total,
                  subtotal: subtotal,
                  shippingFee: shippingFee,
                }}
                items={selectedItems}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cart;
