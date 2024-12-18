'use client'

import { useState, useEffect } from 'react'
import Tickets from '@/components/ticket/Ticket'
import Camping from '@/components/camping/Camping'
import Payment from '@/components/payment/Payment'
import Basket from '@/components/basket/Basket'
import Info from '@/components/info/Info'
import useBookingStore from '@/stores/useBookingStore'
import Progress from '@/components/progress/Progress'

const Booking = () => {
  const [currentView, setCurrentView] = useState('tickets')
  const {
    resetBooking,
    resetBasket,
    timer,
    timerActive,
    decrementTimer,
    stopTimer
  } = useBookingStore()

  useEffect(() => {
    resetBasket()
    stopTimer()
  }, [resetBasket, stopTimer])

  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        decrementTimer()
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [timerActive, decrementTimer])

  useEffect(() => {
    if (timer === 0 && timerActive) {
      alert('Din reservation er udløbet.')
      resetBooking()
      setCurrentView('tickets')
    }
  }, [timer, timerActive, resetBooking])

  const handleCampingNext = async () => {
    const { campingSelection, createReservation, getTotalTents } = useBookingStore.getState();
    const { area } = campingSelection;
    const totalTents = getTotalTents();

  
    try {
      const reservationId = await createReservation(area, totalTents); 
      if (reservationId) {
        console.log("Reservation oprettet:", reservationId);
        setCurrentView("info");
      } else {
        alert("Kunne ikke oprette reservation. Prøv igen.");
      }
    } catch (error) {
      console.error("Fejl under oprettelse af reservation:", error);
      alert("Noget gik galt. Prøv igen.");
    }
  };

  return (
    <>
      {timerActive && (
        <div className='sticky top-0 z-20 bg-black text-primary border-b border-t border-primary text-center py-2 mb-8'>
          Reservation expires in: {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, '0')}
        </div>
      )}

      <div className='px-4 max-w-5xl mx-auto'>
      <h1 className='text-center text-4xl font-bold font-titan text-whit mt-12'>Booking</h1>
      <Progress currentStep={currentView} />

        <div className='flex flex-col md:grid md:grid-cols-[65%_30%] lg:justify-between gap-4'>
          <div className='ticket-selection'>
            {currentView === 'tickets' && (
              <Tickets onNext={() => setCurrentView('camping')} />
            )}

            {currentView === 'camping' && (
              <Camping
                onNext={handleCampingNext}
                onBack={() => setCurrentView('tickets')}
              />
            )}

            {currentView === 'info' && (
              <Info
                onNext={() => setCurrentView('payment')}
                onBack={() => setCurrentView('tickets')}
                setCurrentView={setCurrentView}
              />
            )}

            {currentView === 'payment' && (
              <Payment
                onBack={() => setCurrentView('info')}
                setCurrentView={setCurrentView}
              />
            )}

          {currentView === 'purchased' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Payment completed! Thank you for your order.
              </h2>
              <p className="text-white mb-4">
                Reservation ID: <span className="font-semibold">{useBookingStore.getState().reservationId}</span>
              </p>
              <p className="mb-4">
                You can review your purchased items in the cart. Additionally, a confirmation email with all your order details has been sent to you.
              </p>
              <p>Thank you for choosing us, and we hope you enjoy your experience!</p>
            </div>
          )}
          </div>

          <div className='basket-wrapper'>
            <Basket />
          </div>
        </div>
      </div>
    </>
  )
}

export default Booking
