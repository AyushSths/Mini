import Image from "next/image";
import Navbar from "../components/Navbar";
import ProductCard from "@/components/ProductCard";
import HomeInfo from "@/components/HomeInfo"

export default function Home() {
  return (
    <main className=" bg-gray-100 min-h-screen">
      <HomeInfo />
      <div className="max-w-[1480px] m-auto pt-15">
        <ProductCard />
      </div>
    </main>
  );
}
