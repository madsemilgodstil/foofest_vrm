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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vælg Billetter</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="flex justify-between items-center mb-4">
          <p className="text-lg">{ticket.title}</p>
          <input
            type="number"
            value={ticket.quantity}
            onChange={(e) =>
              handleQuantityChange(ticket.id, parseInt(e.target.value, 10) || 0)
            }
            className="border p-2 w-16 text-center text-black rounded"
            min="0"
          />
        </div>
      ))}
      <button
        onClick={onNext}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Gå videre til Camping
      </button>
    </div>
  );
};

export default Tickets;
