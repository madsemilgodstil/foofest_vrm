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
  const [currentView, setCurrentView] = useState("tickets");
  const {
    resetBooking,
    resetBasket,
    timer,
    timerActive,
    decrementTimer,
    setTimer,
    stopTimer,
  } = useBookingStore(); // Zustand actions and state

  // Reset basket when entering the booking page
  useEffect(() => {
    resetBasket();
    stopTimer(); // Stop and reset the timer when navigating to the booking page
  }, [resetBasket, stopTimer]);

  // Start timer countdown when the timer is active
  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        decrementTimer(); // Decrement timer by 1 every second
      }, 1000);

      return () => clearInterval(interval); // Clean up the interval when the component is unmounted
    }
  }, [timerActive, decrementTimer]);

  // Handle expired reservation
  useEffect(() => {
    if (timer === 0 && timerActive) {
      alert("Din reservation er udløbet.");
      resetBooking(); // Reset the booking state
      setCurrentView("tickets"); // Go back to the tickets view
    }
  }, [timer, timerActive, resetBooking]);

  const handleLoginSuccess = () => {
    setCurrentView("tickets");
  };

  const startReservationTimer = () => {
    setTimer(300); // Start a 5-minute timer (300 seconds)
  };

  return (
    <>
      {/* Display global timer */}
      {timerActive && (
        <div className="sticky top-0 z-50 bg-black text-primary border-b border-t border-primary text-center py-2 mb-8">
          Reservation udløber om: {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, "0")}
        </div>
      )}

      <div className="px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Booking</h1>

        <div className="grid grid-cols-[65%_30%] justify-between">
          <div className="ticket-selection">
            {currentView === "tickets" && (
              <Tickets onNext={() => setCurrentView("camping")} />
            )}

            {currentView === "camping" && (
              <Camping
                onNext={() => {
                  startReservationTimer(); // Start timer when moving to the next step
                  setCurrentView("info");
                }}
                onBack={() => setCurrentView("tickets")}
              />
            )}

            {currentView === "info" && (
              <Info
                onNext={() => setCurrentView("payment")}
                onBack={() => setCurrentView("tickets")}
                setCurrentView={setCurrentView}
              />
            )}

            {currentView === "payment" && (
              <Payment
                onBack={() => setCurrentView("info")}
                setCurrentView={setCurrentView} // Pass setCurrentView to allow navigation
              />
            )}

            {currentView === "login" && (    
              <BookingLogin onLoginSuccess={handleLoginSuccess} />
            )}
          </div>

          <div className="basket-wrapper">
            <Basket />
          </div>
  
        </div>
      </div>
    </>
  );
};

export default Booking;