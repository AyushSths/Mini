import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Props = {
  onSubmit: () => boolean; // returns true if valid
};

const OrderSummary = ({ onSubmit }: Props) => {
  const [order, setOrder] = useState({ subtotal: 0, shippingFee: 0, total: 0 });
  const [open, setOpen] = useState(false); // manually control dialog

  useEffect(() => {
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
              <AlertDialogTitle>Your order has been placed successfully.</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setOpen(false)}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default OrderSummary;
