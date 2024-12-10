import React from "react";
import useBookingStore from "@/stores/useBookingStore";

const Tickets = ({ onNext }) => {
  const tickets = useBookingStore((state) => state.tickets);
  const updateTickets = useBookingStore((state) => state.updateTickets);

  const handleQuantityChange = (id, quantity) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, quantity: Math.max(0, quantity) } : ticket
    );
    updateTickets(updatedTickets);
  };

  const hasSelectedTickets = tickets.some((ticket) => ticket.quantity > 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">Vælg Billetter</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="flex justify-between items-center mb-4">
          <p className="text-lg">{ticket.title}</p>
          <input
            type="number"
            value={ticket.quantity}
            onChange={(e) =>
              handleQuantityChange(ticket.id, parseInt(e.target.value, 10) || 0)
            }
            className="border border-primary p-2 w-16 text-center text-white bg-black rounded focus:outline-none focus:ring-0"
            min="0"
          />
        </div>
      ))}

      <div className="flex justify-end mt-4">
        <button
          onClick={onNext}
          className={`px-10 py-2 bg-primary border border-primary text-white rounded-full ${
            !hasSelectedTickets ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!hasSelectedTickets} // Disable button if no tickets selected
        >
          Gå videre til Camping
        </button>
      </div>
    </div>
  );
};

export default Tickets;
