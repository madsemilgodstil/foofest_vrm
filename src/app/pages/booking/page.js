"use client";

import { useState, useEffect } from "react";

import Tickets from "@/components/ticket/Ticket";
import Camping from "@/components/camping/Camping";
import Payment from "@/components/payment/Payment";
import Basket from "@/components/basket/Basket";
import BookingLogin from "@/components/bookingLogin/bookingLogin";

import useBookingStore from "@/stores/useBookingStore"; // Importer Zustand store


const Booking = () => {
  const [currentView, setCurrentView] = useState("payment"); // Default to login step
  const { resetBooking } = useBookingStore();  // Use resetBooking function from Zustand

  useEffect(() => {
    return () => {
      resetBooking();  // Use Zustand method to reset the state when user leaves the page
    };
  }, [resetBooking]);

  const handleLoginSuccess = () => {
    setCurrentView("tickets"); // Proceed to tickets after login/signup
  };

  return (
    <div className="px-4 max-w-5xl mx-auto"> {/* Justeret bredden */}
      <h1 className="text-3xl font-bold mb-6 text-center">Booking</h1>
      <div className="grid grid-cols-[65%_30%] justify-between"> {/* Justeret gitterafstand */}
        {/* Venstre side */}
        <div className="ticket-selection">
          {/* Step 1: Login/Signup */}
          {currentView === "login" && (
            <BookingLogin onLoginSuccess={handleLoginSuccess} />
          )}

          {/* Step 2: Tickets */}
          {currentView === "tickets" && (
            <>
              <Tickets onNext={() => setCurrentView("camping")} />
            </>
          )}

          {/* Step 3: Camping */}
          {currentView === "camping" && (
            <>
              <Camping
                onNext={() => setCurrentView("payment")}
                onBack={() => setCurrentView("tickets")}
              />
            </>
          )}

          {/* Step 4: Payment */}
          {currentView === "payment" && (
            <>
              <Payment onBack={() => setCurrentView("camping")} />
            </>
          )}
        </div>

        {/* Højre side */}
        <div className="basket-wrapper">
          <Basket />
        </div>
      </div>
    </div>
  );
};

export default Booking;