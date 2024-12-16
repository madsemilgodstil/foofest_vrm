"use client";

import React, { useEffect } from "react";
import useBookingStore from "@/stores/useBookingStore";
import { useForm, useFieldArray } from "react-hook-form";

const Info = ({ onNext, setCurrentView }) => {
  const tickets = useBookingStore((state) => state.tickets);
  const createReservation = useBookingStore((state) => state.createReservation);
  const reservationId = useBookingStore((state) => state.reservationId);
  const setReservationId = useBookingStore((state) => state.setReservationId);
  const { resetBooking, setTimer } = useBookingStore();

  // Hent totalTickets fra Zustand
  const totalTickets = tickets.reduce(
    (total, ticket) => total + ticket.quantity,
    0
  );

  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      forms: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "forms",
  });

  // Initialiser formularer baseret på totalTickets
  useEffect(() => {
    const newForms = Array.from({ length: totalTickets }, () => ({
      name: "",
      email: "",
    }));
    setValue("forms", newForms);
  }, [totalTickets, setValue]);

  // Opret reservation og vis ID
  useEffect(() => {
    if (totalTickets > 0 && !reservationId) {
      const fetchReservation = async () => {
        try {
          const id = await createReservation("Alfheim", totalTickets); // Henter dynamisk område senere
          if (id) {
            console.log("Reservation ID oprettet:", id);
            setReservationId(id);
          } else {
            throw new Error("Reservation ID er null.");
          }
        } catch (error) {
          console.error("Kunne ikke oprette reservation:", error.message);
        }
      };
      fetchReservation();
    }
  }, [totalTickets, reservationId, createReservation, setReservationId]);

  // Log reservationId, når det opdateres
  useEffect(() => {
    if (reservationId) {
      console.log("Reservation ID opdateret:", reservationId);
    }
  }, [reservationId]);

  // Håndter næste trin
  const onSubmit = (data) => {
    console.log("Form data:", data.forms);
    onNext();
  };

  // Nulstil kun timeren og reservationen
  const onBackHandler = () => {
    setReservationId(null);
    setTimer(0);
    setCurrentView("tickets");
  };

  return (
    <div className="text-white p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Udfyld Oplysninger
      </h2>

      {/* Vis Reservation ID med grøn tekst */}
      {/* {reservationId ? (
        <p className="text-green-400 font-semibold mb-4">
          Reservation ID: {reservationId}
        </p>
      ) : (
        <p className="text-yellow-400 mb-4">Opretter reservation...</p>
      )} */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((item, index) => (
          <div key={item.id} className="mb-4 rounded-md">
            <h3 className="text-lg font-semibold text-white mb-2">
              Person {index + 1}
            </h3>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-1"
                htmlFor={`forms.${index}.name`}
              >
                Navn
              </label>
              <input
                {...register(`forms.${index}.name`, {
                  required: "Navn er påkrævet.",
                })}
                type="text"
                className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
                placeholder="Indtast navn"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-1"
                htmlFor={`forms.${index}.email`}
              >
                Email
              </label>
              <input
                {...register(`forms.${index}.email`, {
                  required: "Email er påkrævet.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ugyldig emailadresse.",
                  },
                })}
                type="email"
                className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
                placeholder="Indtast email"
              />
            </div>
            <hr className="border-primary my-6" />
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button
            onClick={onBackHandler}
            type="button"
            className="px-10 py-2 border border-primary text-white rounded-full"
          >
            Afslut Reservationen
          </button>
          <button
            type="submit"
            className="px-10 py-2 bg-primary border border-primary text-white rounded-full"
          >
            Gå videre til Betaling
          </button>
        </div>
      </form>
    </div>
  );
};

export default Info;
