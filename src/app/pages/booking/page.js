"use client";

import { useState, useEffect } from "react";
import Tickets from "@/components/ticket/Ticket";
import Camping from "@/components/camping/Camping";
import Payment from "@/components/payment/Payment";
import Basket from "@/components/basket/Basket";
import useBookingStore from "@/stores/useBookingStore"; // Importer Zustand store

const Booking = () => {
  const [currentView, setCurrentView] = useState("tickets");

  const { resetBooking } = useBookingStore();  // Brug resetBooking funktion fra Zustand

  useEffect(() => {
    // Nulstil dataene, når brugeren forlader siden (komponenten unmounts)
    return () => {
      resetBooking();  // Brug Zustand-metoden til at nulstille tilstanden
    };
  }, [resetBooking]);


  return (
    <div className="px-2 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Booking</h1>
      <div className="grid grid-cols-[70%_30%] gap-8">
        {/* Venstre side */}
        <div className="ticket-selection">
          {currentView === "tickets" && (
            <Tickets onNext={() => setCurrentView("camping")} />
          )}
          {currentView === "camping" && (
            <Camping
              onNext={() => setCurrentView("payment")}
              onBack={() => setCurrentView("tickets")}
            />
          )}
          {currentView === "payment" && (
            <Payment onBack={() => setCurrentView("camping")} />
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