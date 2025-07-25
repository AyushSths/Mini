"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
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
      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/randomproducts"
      );
      const data = await res.json();
      setProducts(data?.data.data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen bg-gray-100 px-5 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1480px] mx-auto">
        <Card className="cursor-pointer transform duration-150 ease-in hover:scale-[1.05]">
          <CardHeader onClick={() => router.push("/admin/products")}>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>{products?.length}</CardContent>
        </Card>
        <Card className="cursor-pointer transform duration-150 ease-in hover:scale-[1.05]">
          <CardHeader onClick={() => router.push("/admin/orders")}>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>{orders?.length}</CardContent>
        </Card>
        <Card className="cursor-pointer transform duration-150 ease-in hover:scale-[1.05]">
          <CardHeader onClick={() => router.push("/admin/revenue")}>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>Rs. {totalRevenue}</CardContent>
        </Card>
      </div>
    </div>
  );
}
