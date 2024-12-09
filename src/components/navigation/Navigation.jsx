"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname(); // Få den aktuelle sti

  return (
    <div className="flex justify-between items-center py-4 max-w-7xl mx-auto px-2">
      <div>
        <h1 className="text-4xl font-bold text-primary">Foo Fest</h1>
      </div>
      <div className="flex space-x-8 font-bold">
        <Link
          href="/"
          className={`relative group ${pathname === "/" ? "text-primary" : ""}`}
        >
          Home
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
              pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          href="/pages/artist"
          className={`relative group ${
            pathname === "/pages/artist" ? "text-primary" : ""
          }`}
        >
          Artist
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
              pathname === "/pages/artist" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          href="/pages/program"
          className={`relative group ${
            pathname === "/pages/program" ? "text-primary" : ""
          }`}
        >
          Program
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
              pathname === "/pages/program"
                ? "w-full"
                : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          href="/pages/booking"
          className={`relative group ${
            pathname === "/pages/booking" ? "text-primary" : ""
          }`}
        >
          Booking
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
              pathname === "/pages/booking"
                ? "w-full"
                : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          href="/pages/info"
          className={`relative group ${
            pathname === "/pages/info" ? "text-primary" : ""
          }`}
        >
          Info
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
              pathname === "/pages/info" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          href="/pages/login"
          className={`relative group ${
            pathname === "/pages/info" ? "text-primary" : ""
          }`}
        >
          Login
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
              pathname === "/pages/login" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
