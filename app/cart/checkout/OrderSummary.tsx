"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  onSubmit: () => boolean; // returns true if valid
};

const OrderSummary = ({ onSubmit }: Props) => {
  const [order, setOrder] = useState({ subtotal: 0, shippingFee: 0, total: 0 });
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("selectedItems") || "[]");
    setSelectedItems(items);
    console.log(selectedItems);
    
    const info = localStorage.getItem("checkout");
    if (info) {
      setOrder(JSON.parse(info));
    }
  }, []);

  const handleClick = () => {
    const success = onSubmit();
    if (success) {
      setOpen(true); // only open if valid
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>Rs.{order.subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span>Rs.{order.shippingFee}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>Rs.{order.total}</span>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <Button
            className="w-full py-2 rounded hover:bg-slate-700 mt-4"
            onClick={handleClick}
          >
            Checkout
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Billing summary</AlertDialogTitle>
            </AlertDialogHeader>

            <div className="text-base text-muted-foreground px-1 py-2 space-y-4">
              <div className="user-info">
                {

                }
              </div>
              {selectedItems?.map((item: any) => (
                <div
                  className="item-name flex justify-between items-center"
                  key={item.id}
                >
                  <p className="flex items-center gap-x-2">
                    <img src={item.thumbnail} alt="" className="w-13"/>
                    {item.title} x {item.quantity}
                  </p>
                  <p>Rs.{item.price}</p>
                </div>
              ))}
              <div className="flex justify-between items-center font-semibold">
                <p>Total</p>
                <p>Rs.{order.total}</p>
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => router.push("/success")}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default OrderSummary;
