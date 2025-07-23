"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  order: {
    total: number;
  };
  items: {
    title: string;
    price: number;
    quantity: number;
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();
 
  useEffect(() => {
    const data = localStorage.getItem("allOrders");
    if (data) setOrders(JSON.parse(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1280px] mx-auto rounded-lg  p-6">
        <h2 className="text-3xl font-semibold mb-4">All Orders</h2>
        <div className="  max-h-[680px] overflow-x-scroll shadow-md rounded border">
          <table className="min-w-full bg-white text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Address</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-4">{i + 1}</td>
                  <td className="p-4">{order.customer.name}</td>
                  <td className="p-4">{order.customer.email}</td>
                  <td className="p-4">{order.customer.phone}</td>
                  <td className="p-4">{order.customer.address}</td>
                  <td className="p-4">
                    <ul className="p-4">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.title} — Rs.{item.price} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 font-semibold">Rs.{order.order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
