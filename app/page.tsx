import Image from "next/image";
import Navbar from "../components/Navbar";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <main className="max-w-[1480px] m-auto">
      {/* <Navbar/> */}
      <ProductCard/>
    </main>

  );
}
