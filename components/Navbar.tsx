import React, { useEffect, useRef, useState } from "react";
import CartButton from "./Buttons/CartButton";
import Link from "next/link";
import SearchButton from "./Buttons/SearchButton";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrollBy, setScrollBy] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 10) {
        setScrollBy(true);
      } else {
        setScrollBy(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false); // close search if clicked outside navbar
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // return () => {
    // };
  }, []);

  const toggleSearch = () => {
    if (window.innerWidth < 768) {
      setOpen(true);
    }
  };

  return (
    <div
      ref={navRef}
      className={`navbar -mt-0.5 bg-[#059669] text-white sticky top-0 z-100 ${
        scrollBy == true ? "shadow-lg" : null
      } `}
    >
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
