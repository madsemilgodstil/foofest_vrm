import React from "react";
import useBookingStore from "@/stores/useBookingStore";

const Basket = () => {
  const tickets = useBookingStore((state) => state.tickets);
  const campingSelection = useBookingStore((state) => state.campingSelection);

  const ticketTotal = tickets.reduce(
    (total, ticket) => total + ticket.price * ticket.quantity,
    0
  );

  const totalTickets = tickets.reduce(
    (total, ticket) => total + ticket.quantity,
    0
  );

  const totalTents =
    campingSelection.tents.twoPerson + campingSelection.tents.threePerson;

  const tentTotal =
    campingSelection.tents.twoPerson * 299 +
    campingSelection.tents.threePerson * 399;

  const greenCampingPrice = campingSelection.greenCamping ? 249 : 0;
  const bookingFee = 99;
  const total = ticketTotal + tentTotal + greenCampingPrice + bookingFee;

  return (
    <div className="sticky top-5 right-0 border border-primary rounded-lg p-4  text-white">
      {totalTickets > 0 && (
        <>
          <h3 className="font-bold text-lg text-primary mb-2">Billetter</h3>
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
              <p className="text-white">Område:</p>
              <p className="text-white">{campingSelection.area}</p>
            </div>
          )}

          {campingSelection.tents.twoPerson > 0 && (
            <div className="flex justify-between mb-2">
              <p className="text-white">
                2 personers telt x {campingSelection.tents.twoPerson}
              </p>
              <p className="text-white">
                {campingSelection.tents.twoPerson * 299} DKK
              </p>
            </div>
          )}
          {campingSelection.tents.threePerson > 0 && (
            <div className="flex justify-between mb-2">
              <p className="text-white">
                3 personers telt x {campingSelection.tents.threePerson}
              </p>
              <p className="text-white">
                {campingSelection.tents.threePerson * 399} DKK
              </p>
            </div>
          )}

          <hr className="border-primary my-4" />
        </>
      )}

      <h3 className="font-bold text-lg text-primary mb-2">Oversigt</h3>
      {tickets.some((ticket) => ticket.quantity > 0) && (
        <div className="flex justify-between mb-2">
          <p>Billetter x {totalTickets}</p>
          <p>{ticketTotal} DKK</p>
        </div>
      )}
      {totalTents > 0 && (
        <div className="flex justify-between mb-2">
          <p>Telte x {totalTents}</p>
          <p>{tentTotal} DKK</p>
        </div>
      )}
      {campingSelection.greenCamping && (
        <div className="flex justify-between mb-2">
          <p>Grøn camping</p>
          <p>{greenCampingPrice} DKK</p>
        </div>
      )}
      <div className="flex justify-between mb-2">
        <p>Booking gebyr</p>
        <p>{bookingFee} DKK</p>
      </div>

      <hr className="border-primary my-4" />

      <div className="flex justify-between text-lg font-bold">
        <p>I ALT</p>
        <p>{total} DKK</p>
      </div>
    </div>
  );
};

export default Basket;
