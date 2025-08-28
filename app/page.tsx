import Image from "next/image";
import Navbar from "../components/Navbar";
import ProductCard from "@/components/ProductCard";
import HomeInfo from "@/components/HomeInfo";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeInfo />
      <div className="relative h-full w-full ">
        {/* <div className="bg-black opacity-30 absolute h-[100%] w-full z-0" /> */}
        <div className="max-w-[1480px] m-auto pt-15 relative z-10 text-gray-800">
          <ProductCard />
        </div>
      </div>
    </main>
  );
}
