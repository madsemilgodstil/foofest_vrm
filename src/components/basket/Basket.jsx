import React from "react";
import useBookingStore from "@/stores/useBookingStore";

const Basket = () => {
  const tickets = useBookingStore((state) => state.tickets);
  const campingSelection = useBookingStore((state) => state.campingSelection);
  const totalTents = useBookingStore((state) => state.getTotalTents());

  const ticketTotal = tickets.reduce(
    (total, ticket) => total + ticket.price * ticket.quantity,
    0
  );

  const totalTickets = tickets.reduce(
    (total, ticket) => total + ticket.quantity,
    0
  );

  // const totalTents =
  //   campingSelection.tents.twoPerson +
  //   campingSelection.tents.threePerson +
  //   (campingSelection.tents.ownTent || 0);

  const tentTotal =
    campingSelection.tents.twoPerson * 299 +
    campingSelection.tents.threePerson * 399; // ownTent er gratis (0 DKK)

  const greenCampingPrice = campingSelection.greenCamping ? 249 : 0;
  const bookingFee = 99;
  const total = ticketTotal + tentTotal + greenCampingPrice + bookingFee;

  return (
    <div className="sticky top-16 border border-primary p-4 text-white rounded-xl">
      {/* Billetter Overskrift */}
      {totalTickets > 0 && (
        <>
          <h3 className="font-bold text-lg text-primary mb-2">Tickets</h3>
          <div className="mb-4">
            {tickets.map(
              (ticket) =>
                ticket.quantity > 0 && (
                  <div key={ticket.id} className="flex justify-between mb-2">
                    <p className="text-white">{ticket.title}</p>
                    <p className="text-white">
                      {ticket.quantity} x {ticket.price} DKK
                    </p>
                  </div>
                )
            )}
            <hr className="border-primary my-4" />
          </div>
        </>
      )}

      {(campingSelection.area || totalTents > 0) && (
        <>
          <h3 className="font-bold text-lg text-primary mb-2">Camping</h3>

          {campingSelection.area && (
            <div className="flex justify-between items-center">
              <p className="text-white">Area:</p>
              <p className="text-white">{campingSelection.area}</p>
            </div>
          )}

          {campingSelection.tents.twoPerson > 0 && (
            <div className="flex justify-between mb-2">
              <p className="text-white">
                2 person tent x {campingSelection.tents.twoPerson}
              </p>
              <p className="text-white">
                {campingSelection.tents.twoPerson * 299} DKK
              </p>
            </div>
          )}
          {campingSelection.tents.threePerson > 0 && (
            <div className="flex justify-between mb-2">
              <p className="text-white">
                3 person tent x {campingSelection.tents.threePerson}
              </p>
              <p className="text-white">
                {campingSelection.tents.threePerson * 399} DKK
              </p>
            </div>
          )}
          {campingSelection.tents.ownTent > 0 && (
            <div className="flex justify-between mb-2">
              <p className="text-white">
                Own Tent x {campingSelection.tents.ownTent}
              </p>
              <p className="text-white">0 DKK</p> {/* Gratis telt */}
            </div>
          )}

          <hr className="border-primary my-4" />
        </>
      )}

      {/* Oversigt */}
      <h3 className="font-bold text-lg text-primary mb-2">Overview</h3>
      {tickets.some((ticket) => ticket.quantity > 0) && (
        <div className="flex justify-between mb-2">
          <p>Tickets x {totalTickets}</p>
          <p>{ticketTotal} DKK</p>
        </div>
      )}
      {totalTents > 0 && (
        <div className="flex justify-between mb-2">
          <p>Tents x {totalTents}</p>
          <p>{tentTotal} DKK</p> {/* ownTent er 0 DKK, så total ændres ikke */}
        </div>
      )}
      {campingSelection.greenCamping && (
        <div className="flex justify-between mb-2">
          <p>Green camping</p>
          <p>{greenCampingPrice} DKK</p>
        </div>
      )}
      <div className="flex justify-between mb-2">
        <p>Booking fee</p>
        <p>{bookingFee} DKK</p>
      </div>

      <hr className="border-primary my-4" />

      <div className="flex justify-between text-lg font-bold">
        <p>TOTAL:</p>
        <p>{total} DKK</p>
      </div>
    </div>
  );
};

export default Basket;
