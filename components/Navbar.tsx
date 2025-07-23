import React from "react";
import CartButton from "./Buttons/CartButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="-m-0.5 bg-slate-900 text-white "> 
      <div className="flex justify-between items-center p-5 lg:px-15 max-w-[1480px] m-auto ">
        <div className="">
          <h1 className="font-bold text-4xl">
            <Link href="/">MINI</Link>
          </h1>
        </div>
        <div>
          <CartButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
