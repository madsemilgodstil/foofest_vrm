import React, { useEffect } from "react";
import useBookingStore from "@/stores/useBookingStore";
import { getCampingAreas } from "@/lib/database";

const Camping = ({ onNext, onBack }) => {
  const tickets = useBookingStore((state) => state.tickets);
  const campingSelection = useBookingStore((state) => state.campingSelection);
  const updateCampingSelection = useBookingStore(
    (state) => state.updateCampingSelection
  );

  const totalTickets = tickets.reduce(
    (total, ticket) => total + ticket.quantity,
    0
  );

  useEffect(() => {
    const fetchCampingAreas = async () => {
      const areas = await getCampingAreas();
      updateCampingSelection({ areas });
    };

    fetchCampingAreas();
  }, [updateCampingSelection]);

  const handleAreaSelect = (area) => {
    if (campingSelection.area === area) {
      // Hvis området allerede er valgt, fjern det
      updateCampingSelection({ area: null });
    } else {
      // Vælg området
      updateCampingSelection({ area });
    }
  };

  const handleTentChange = (type, change) => {
    const updatedTents = {
      ...campingSelection.tents,
      [type]: Math.max(0, campingSelection.tents[type] + change),
    };

    if (updatedTents.twoPerson + updatedTents.threePerson > totalTickets) {
      return;
    }

    updateCampingSelection({ tents: updatedTents });
  };

  const toggleGreenCamping = () => {
    updateCampingSelection({ greenCamping: !campingSelection.greenCamping });
  };

  const hasSelectedArea = !!campingSelection.area;
  const hasSelectedTent =
    campingSelection.tents.twoPerson + campingSelection.tents.threePerson > 0;

  // Allow proceeding to payment if:
  // 1. No selection (totalTickets > 0), OR
  // 2. Both area and tents are selected
  const canProceedToPayment =
    totalTickets > 0 &&
    ((hasSelectedArea && hasSelectedTent) ||
      !hasSelectedArea ||
      !hasSelectedTent);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Vælg Camping Område
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {campingSelection.areas?.map((area) => (
          <button
            key={area.area}
            className={`p-4 border rounded ${
              campingSelection.area === area.area
                ? "border-primary"
                : "border-gray-500"
            } ${area.available === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => area.available > 0 && handleAreaSelect(area.area)}
            disabled={area.available === 0}
          >
            <h3 className="text-lg font-semibold">{area.area}</h3>
            <p
              className={`${
                area.available > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {area.available > 0
                ? `${area.available} Ledige Pladser`
                : "Udsolgt"}
            </p>
          </button>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-6">Tilkøb af Telte</h3>
      <div className="flex justify-between items-center mb-4">
        <p>2 Personers Telt</p>
        <input
          type="number"
          value={campingSelection.tents.twoPerson}
          onChange={(e) =>
            handleTentChange(
              "twoPerson",
              parseInt(e.target.value, 10) - campingSelection.tents.twoPerson
            )
          }
          className="border border-primary p-2 w-16 text-center text-white bg-black rounded focus:outline-none focus:ring-0"
          min="0"
        />
      </div>
      <div className="flex justify-between items-center">
        <p>3 Personers Telt</p>
        <input
          type="number"
          value={campingSelection.tents.threePerson}
          onChange={(e) =>
            handleTentChange(
              "threePerson",
              parseInt(e.target.value, 10) - campingSelection.tents.threePerson
            )
          }
          className="border border-primary p-2 w-16 text-center text-white bg-black rounded focus:outline-none focus:ring-0"
          min="0"
        />
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="greenCamping"
          checked={campingSelection.greenCamping}
          onChange={toggleGreenCamping}
          className="border border-primary text-primary w-5 h-5 rounded-md bg-black focus:outline-none focus:ring-2 focus:ring-primary mr-2"
        />
        <label htmlFor="greenCamping" className="text-lg text-white">
          Grøn Camping
        </label>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="px-10 py-2 border border-primary text-white rounded-full"
        >
          Tilbage til Billetter
        </button>
        <button
          onClick={() => {
            if (
              (hasSelectedArea && !hasSelectedTent) ||
              (!hasSelectedArea && hasSelectedTent)
            ) {
              alert("Du skal vælge både et område og minimum ét telt.");
              return;
            }
            onNext();
          }}
          className="px-10 py-2 bg-primary border border-primary text-white rounded-full"
          disabled={!canProceedToPayment}
        >
          Gå videre til Betaling
        </button>
      </div>
    </div>
  );
};

export default Camping;
