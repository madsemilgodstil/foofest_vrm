"use client";

import React, { useEffect } from "react";
import useBookingStore from "@/stores/useBookingStore";
import { useForm, useFieldArray } from "react-hook-form";

const Info = ({ onNext, onBack }) => {
  const tickets = useBookingStore((state) => state.tickets);

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

  const { fields, append } = useFieldArray({
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

  // Håndter næste trin
  const onSubmit = (data) => {
    // Valider data og send det videre
    console.log("Form data:", data.forms);
    onNext();
  };

  return (
    <div className="text-white p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Udfyld Oplysninger
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
            onClick={onBack}
            type="button"
            className="px-10 py-2 border border-primary text-white rounded-full"
          >
            Tilbage til Camping
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
