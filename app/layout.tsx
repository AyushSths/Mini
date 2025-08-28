"use client";

import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import "@/lib/fontawesome";
import Footer from "@/components/Footer";
import { League_Spartan, Playfair_Display } from 'next/font/google';

const leagueSpartan = League_Spartan({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-league-spartan',
});

// Playfair Display for headings
const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair-display',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en"  className={`${leagueSpartan.variable} ${playfairDisplay.variable}`}>
      <body className="relative h-full w-full bg-[#F9FAF5] text-gray-800 font-heading">
        {/* <div className="bg-black opacity-30 absolute h-[100%] w-full z-0" /> */}
        <div className="z-10 relative">
          {!isAdminRoute && <Navbar />}
          {children}
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
