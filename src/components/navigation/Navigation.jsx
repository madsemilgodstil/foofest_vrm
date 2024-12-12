"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { useAuth } from "@/context/AuthContext"; // Import the AuthContext
import { Button } from "../ui/button";

const Navigation = () => {
  const pathname = usePathname(); // Get the current path
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const { isLoggedIn, logout } = useAuth(); // Access authentication status

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleLogout = () => {
    logout(); // Logout user
    window.location.href = "/"; // Redirect to homepage after logout
  };

  return (
    <>
      <div className="flex justify-between font-oswald items-center py-4 max-w-7xl mx-auto px-2">
        <div>
          <Link href="/">
            <h1
              className={`text-4xl font-moiraione  font-extrabold ${
                pathname === "/" ? "text-primary" : "text-white"
              }`}
            >
              FooFest
            </h1>
          </Link>
        </div>

        <div className="flex space-x-8 font-bold">
          <Link
            href="/"
            className={`relative group ${
              pathname === "/" ? "text-primary" : ""
            }`}
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
                pathname === "/pages/artist"
                  ? "w-full"
                  : "w-0 group-hover:w-full"
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
          {isLoggedIn && (
            <Link
              href="/pages/login"
              className={`relative group ${
                pathname === "/pages/login" ? "text-primary" : ""
              }`}
            >
              My Page
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
                  pathname === "/pages/login"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="relative group text-primary"
            >
              Logout
              <span className="absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 w-full"></span>
            </button>
          ) : (
            <button
              onClick={toggleModal}
              className={`relative group ${
                pathname === "/pages/login" ? "text-primary" : ""
              }`}
            >
              Login
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
                  pathname === "/pages/login"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default Navigation;
