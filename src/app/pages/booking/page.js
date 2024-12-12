"use client";

import { useState, useEffect } from "react";
import Tickets from "@/components/ticket/Ticket";
import Camping from "@/components/camping/Camping";
import Payment from "@/components/payment/Payment";
import Basket from "@/components/basket/Basket";
import Info from "@/components/info/Info";
import BookingLogin from "@/components/bookingLogin/BookingLogin";
import useBookingStore from "@/stores/useBookingStore";

const Booking = () => {
  const [currentView, setCurrentView] = useState("tickets"); // Default to tickets
  const { resetBooking, timer, timerActive, decrementTimer } =
    useBookingStore(); // Zustand actions and state

  useEffect(() => {
    // Reset booking when leaving the page
    return () => {
      resetBooking();
    };
  }, [resetBooking]);

  useEffect(() => {
    // Start timer countdown
    if (timerActive) {
      const interval = setInterval(() => {
        decrementTimer();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerActive, decrementTimer]);

  useEffect(() => {
    // Handle expired reservation
    if (timer === 0 && timerActive) {
      alert("Din reservation er udløbet.");
      resetBooking();
      setCurrentView("tickets");
    }
  }, [timer, timerActive, resetBooking]);

  const handleLoginSuccess = () => {
    setCurrentView("tickets");
  };

  return (
    <div className="px-4 max-w-5xl mx-auto">
      {/* Display global timer */}
      {timerActive && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2">
          Reservation udløber om: {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, "0")}
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6 text-center">Booking</h1>
      <div className="grid grid-cols-[65%_30%] justify-between">
        {/* Left side */}
        <div className="ticket-selection">
          {/* Step 1: Login/Signup */}
          {currentView === "login" && (
            <BookingLogin onLoginSuccess={handleLoginSuccess} />
          )}

          {/* Step 2: Tickets */}
          {currentView === "tickets" && (
            <Tickets onNext={() => setCurrentView("camping")} />
          )}

          {/* Step 3: Camping */}
          {currentView === "camping" && (
            <Camping
              onNext={() => setCurrentView("info")}
              onBack={() => setCurrentView("tickets")}
            />
          )}

          {/* Step 4: Info */}
          {currentView === "info" && (
            <Info
              onNext={() => setCurrentView("payment")}
              onBack={() => setCurrentView("camping")}
            />
          )}

          {/* Step 5: Payment */}
          {currentView === "payment" && (
            <Payment onBack={() => setCurrentView("info")} />
          )}
        </div>
        {/* Right side */}
        <div className="basket-wrapper">
          <Basket />
        </div>
      </div>
    </div>
  );
};

export default Booking;