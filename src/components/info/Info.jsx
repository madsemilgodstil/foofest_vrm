"use client";

import React, { useEffect } from "react";
import useBookingStore from "@/stores/useBookingStore";
import { useForm, useFieldArray } from "react-hook-form";

const Info = ({ onNext, setCurrentView }) => {
  const tickets = useBookingStore((state) => state.tickets);
  const totalTents = useBookingStore((state) => state.getTotalTents());
  const createReservation = useBookingStore((state) => state.createReservation);
  const reservationId = useBookingStore((state) => state.reservationId);
  const setReservationId = useBookingStore((state) => state.setReservationId);
  const campingSelection = useBookingStore((state) => state.campingSelection);
  const { setTimer } = useBookingStore();
  // const { resetBooking } = useBookingStore();

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

  useEffect(() => {
    const newForms = Array.from({ length: totalTickets }, () => ({
      name: "",
      email: "",
    }));
    setValue("forms", newForms);
  }, [totalTickets, setValue]);

  useEffect(() => {
    if (totalTickets > 0 && !reservationId) {
      const fetchReservation = async () => {
        try {
          const selectedArea = campingSelection.area || "Default"; // Fallback til "Default" hvis intet er valgt
          const id = await createReservation(selectedArea, totalTents); // Dynamisk område

          console.log("Reservation ID oprettet:", id);
          setReservationId(id);
        } catch (error) {
          console.error("Kunne ikke oprette reservation:", error.message);
        }
      };

      fetchReservation();
    }
  }, [
    totalTickets,
    reservationId,
    createReservation,
    setReservationId,
    campingSelection.area,
  ]);

  // Log reservationId, når det opdateres
  // useEffect(() => {
  //   if (reservationId) {
  //     console.log("Reservation ID opdateret:", reservationId);
  //   }
  // }, [reservationId]);

  const onSubmit = (data) => {
    console.log("Form data:", data.forms);
    onNext();
  };

  const onBackHandler = () => {
    setReservationId(null);
    setTimer(0);
    setCurrentView("tickets");
  };

  return (
    <div className="text-white rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Fill in the information
      </h2>

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
                Name
              </label>
              <input
                {...register(`forms.${index}.name`, {
                  required: "Name is required.",
                })}
                type="text"
                className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
                placeholder="Enter name"
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
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address.",
                  },
                })}
                type="email"
                className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
                placeholder="Enter email"
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
            Cancel
          </button>
          <button
            type="submit"
            className="px-10 py-2 bg-primary border border-primary text-white rounded-full"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Info;
