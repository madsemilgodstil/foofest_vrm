"use client";

import React, { useState } from "react";
import useBookingStore from "@/stores/useBookingStore"; // Importer Zustand store

export default function Payment({ onBack }) {
  const tickets = useBookingStore((state) => state.tickets);
  const campingSelection = useBookingStore((state) => state.campingSelection);

  const [error, setError] = useState(""); // For fejlmeddelelser

  const bookingFee = 99; // Bookinggebyr

  // Validering af kortnummer
  const validateCardNumber = (cardNumber) => {
    const regex = /^[0-9]{13,19}$/;
    return regex.test(cardNumber);
  };

  // Validering af udløbsdato (MM/ÅÅ format)
  const validateExpiryDate = (expiryDate) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiryDate)) return false;

    const [month, year] = expiryDate.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      parseInt(year) > currentYear ||
      (parseInt(year) === currentYear && parseInt(month) >= currentMonth)
    ) {
      return true;
    }
    return false;
  };

  // Validering af CVC (3 cifre)
  const validateCVC = (cvc) => {
    return /^[0-9]{3}$/.test(cvc);
  };

  // Håndter betaling
  const handlePayment = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const cardNumber = formData.get("cardNumber");
    const expiryDate = formData.get("expiryDate");
    const cvc = formData.get("cvc");

    // Valider kortoplysningerne
    if (!validateCardNumber(cardNumber)) {
      setError("Ugyldigt kortnummer. Det skal være mellem 13 og 19 cifre.");
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      setError("Ugyldig udløbsdato. Sørg for, at datoen er i fremtiden.");
      return;
    }

    if (!validateCVC(cvc)) {
      setError("Ugyldig CVC. Det skal være 3 cifre.");
      return;
    }

    // Hvis alt er valideret, vis en alert med bestillingen
    const ticketDetails = tickets
      .filter((ticket) => ticket.quantity > 0)
      .map(
        (ticket) =>
          `${ticket.title} x ${ticket.quantity} - ${
            ticket.price * ticket.quantity
          } DKK`
      )
      .join("\n");

    const tentsDetails = `
      2 Personers Telte x ${campingSelection.tents.twoPerson} - ${
      campingSelection.tents.twoPerson * 299
    } DKK
      3 Personers Telte x ${campingSelection.tents.threePerson} - ${
      campingSelection.tents.threePerson * 399
    } DKK
    `.trim();

    const totalAmount =
      tickets.reduce(
        (total, ticket) => total + ticket.price * ticket.quantity,
        0
      ) +
      campingSelection.tents.twoPerson * 299 +
      campingSelection.tents.threePerson * 399 +
      bookingFee;

    // Simuler betalingen og vis detaljer i en alert
    alert(`
      Betaling gennemført! Tak for din ordre.

      Kortnummer: ${cardNumber}
      Udløbsdato: ${expiryDate}
      CVC: ${cvc}

      Bestillingsdetaljer:
      ${ticketDetails}
      ${tentsDetails}

      Booking gebyr: ${bookingFee} DKK

      I ALT: ${totalAmount} DKK
    `);

    e.target.reset(); // Nulstil formularen
    setError(""); // Nulstil fejlmeddelelser
  };

  return (
    <div className="max-w-lg mx-auto bg-black text-white p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Betalingsoplysninger
      </h2>

      {/* Fejlmeddelelse */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-bold mb-1">
            Kortnummer
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
            placeholder="Kort nummer"
            required
          />
        </div>
        <div>
          <label htmlFor="cardHolder" className="block text-sm font-bold mb-1">
            Kortholder navn
          </label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
            placeholder="Kortholder navn"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-sm font-bold mb-1"
            >
              Udløbsdato
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
              placeholder="MM/ÅÅ"
              required
            />
          </div>
          <div>
            <label htmlFor="cvc" className="block text-sm font-bold mb-1">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
              placeholder="CVC"
              required
            />
          </div>
        </div>
        <div className="flex justify-between space-x-4 mt-4">
          <button
            onClick={onBack}
            className="px-10 py-2 border border-primary text-white rounded-full"
          >
            Tilbage til Camping
          </button>
          <button
            type="submit"
            className="px-10 py-2 bg-primary border border-primary text-white rounded-full"
          >
            Bekræft betaling
          </button>
        </div>
      </form>
    </div>
  );
}
