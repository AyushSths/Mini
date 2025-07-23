"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RevenuePage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("allOrders");
    if (data) {
      const parsed = JSON.parse(data);
      setOrders(parsed);

      const revenue = parsed.reduce((acc: number, order: any) => {
        if (order.total) return acc + order.total;
        const itemTotal = order.items?.reduce(
          (sum: number, item: any) => sum + item.price * item.quantity,
          0
        );
        return acc + itemTotal;
      }, 0);

      setTotalRevenue(revenue);
    }
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Revenue Dashboard</h2>

        <div className="bg-white p-6 rounded shadow mb-8">
          <p className="text-lg text-gray-500">Total Revenue</p>
          <h3 className="text-4xl font-bold text-green-600">Rs. {totalRevenue}</h3>
        </div>

        <div className="overflow-x-scroll max-h-[580px]">
          <table className="min-w-full bg-white shadow rounded">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Email</th>
                <th className="p-4">Order Items</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => {
                const total = order.total
                  ? order.total
                  : order.items.reduce(
                      (sum: number, item: any) =>
                        sum + item.price * item.quantity,
                      0
                    );

                return (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-4">{i + 1}</td>
                    <td className="p-4 font-medium">{order.customer.name}</td>
                    <td className="p-4 text-sm">{order.customer.email}</td>
                    <td className="p-4 text-sm">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </td>
                    <td className="p-4 text-right font-semibold">Rs. {total}</td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={5}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
