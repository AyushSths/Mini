import React, { useEffect, useRef, useState } from "react";
import CartButton from "./Buttons/CartButton";
import Link from "next/link";
import SearchButton from "./Buttons/SearchButton";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false); // close search if clicked outside navbar
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    if (window.innerWidth < 768) {
      setOpen(!open);
    }
  };

  return (
    <div ref={navRef} className="navbar -m-0.5 bg-slate-900 text-white">
      <div className="flex justify-between items-center p-5 lg:px-15 max-w-[1480px] m-auto w-full">
        
          <h1 className="font-bold md:text-5xl text-4xl">
            <Link href="/">MINI</Link>
          </h1>
        
        <div className="relative flex items-center gap-x-5">
          <div onClick={toggleSearch}>
            <SearchButton />
          </div>

          {!open && (
            <div className="hidden md:block">
              <CartButton />
            </div>
          )}
          <div className={`md:hidden ${open ? "hidden" : "block"}`}>
            <CartButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
