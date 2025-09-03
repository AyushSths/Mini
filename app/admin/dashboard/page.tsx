"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem("allOrders");
    if (data) {
      const parsedOrders = JSON.parse(data);
      setOrders(parsedOrders);

      const revenue = parsedOrders.reduce((acc: number, order: any) => {
        const itemTotal = order.items?.reduce(
          (sum: number, item: any) => sum + item.price * item.quantity,
          0
        );
        return acc + itemTotal;
      }, 0);

      setTotalRevenue(revenue);
    }

    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data?.products || []);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen px-5 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1480px] mx-auto ">
        <Card className="cursor-pointer group flex flex-row pr-3 items-center justify-between pb-5 transform duration-150 ease-in hover:scale-[1.05] bg-emerald-600 text-white rounded-md">
          <div className="w-full space-y-2">
            <CardHeader onClick={() => router.push("/admin/products")}>
              <CardTitle className="text-xl font-bold">
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>{products?.length}</CardContent>
          </div>
          <div className="group-hover:translate-x-0 group-hover:opacity-100 transform transition -translate-x-20 duration-150 ease-in opacity-0">
            <ArrowRight className="w-10 h-10 group-hover:block hidden " />
          </div>
        </Card>
        <Card className="cursor-pointer group flex flex-row pr-3 items-center justify-between pb-5 transform duration-150 ease-in hover:scale-[1.05] bg-emerald-600 text-white rounded-md">
          <div className="w-full space-y-2">
            <CardHeader onClick={() => router.push("/admin/orders")}>
              <CardTitle className="text-xl font-bold">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>{orders?.length}</CardContent>
          </div>
          <div className="group-hover:translate-x-0 group-hover:opacity-100 transform transition -translate-x-20 duration-150 ease-in opacity-0">
            <ArrowRight className="w-10 h-10 group-hover:block hidden " />
          </div>
        </Card>
        <Card className="cursor-pointer group flex flex-row pr-3 items-center justify-between pb-5 transform duration-150 ease-in hover:scale-[1.05] bg-emerald-600 text-white rounded-md">
          <div className="w-full space-y-2">
            <CardHeader onClick={() => router.push("/admin/revenue")}>
              <CardTitle className="text-xl font-bold">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>Rs. {totalRevenue}</CardContent>
          </div>
          <div className="group-hover:translate-x-0 group-hover:opacity-100 transform transition -translate-x-20 duration-150 ease-in opacity-0">
            <ArrowRight className="w-10 h-10 group-hover:block hidden " />
          </div>
        </Card>
      </div>
    </div>
  );
}
