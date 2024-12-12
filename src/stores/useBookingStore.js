import { create } from "zustand";

const defaultTickets = [
  { id: 1, title: "Foo-Billet", price: 799, quantity: 0 },
  { id: 2, title: "VIP-Billet", price: 1299, quantity: 0 },
];

const defaultCampingSelection = {
  area: null,
  tents: { twoPerson: 0, threePerson: 0 },
  greenCamping: false,
  areas: [], // Tilgængelige campingområder
};

const useBookingStore = create((set) => ({
  tickets: [...defaultTickets],
  campingSelection: { ...defaultCampingSelection },
  timer: 0,
  timerActive: false,
  reservationId: null,

  setTimer: (time) => set({ timer: time, timerActive: true }),
  decrementTimer: () =>
    set((state) => ({
      timer: state.timer > 0 ? state.timer - 1 : 0,
      timerActive: state.timer > 1,
    })),
  stopTimer: () => set({ timerActive: false, timer: 0 }),
  setReservationId: (id) => set({ reservationId: id }),

  // Funktion til kun at nulstille campingområdet
  resetSelectedArea: () =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        area: null, // Kun nulstil området, ikke teltene
      },
    })),

  updateTickets: (updatedTickets) => {
    set((state) => {
      const totalTickets = updatedTickets.reduce(
        (total, ticket) => total + ticket.quantity,
        0
      );

      const totalTents =
        state.campingSelection.tents.twoPerson +
        state.campingSelection.tents.threePerson;

      let updatedTents = { ...state.campingSelection.tents };
      if (totalTents > totalTickets) {
        while (updatedTents.twoPerson + updatedTents.threePerson > totalTickets) {
          if (updatedTents.threePerson > 0) {
            updatedTents.threePerson -= 1;
          } else if (updatedTents.twoPerson > 0) {
            updatedTents.twoPerson -= 1;
          }
        }
      }

      // Kontroller, om campingområdet skal nulstilles
      const selectedArea = state.campingSelection.area;
      let validArea = selectedArea;

      if (selectedArea) {
        const area = state.campingSelection.areas.find(
          (area) => area.area === selectedArea
        );

        if (area && totalTickets > area.available) {
          validArea = null; // Nulstil området, hvis billetterne er større end de ledige pladser
        }
      }

      return {
        ...state,
        tickets: updatedTickets,
        campingSelection: {
          ...state.campingSelection,
          tents: updatedTents, // Behold teltene (ikke nulstil dem)
          area: validArea, // Behold området, hvis det er gyldigt
        },
      };
    });
  },

  updateCampingSelection: (updatedCamping) =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        ...updatedCamping,
      },
    })),

  resetBooking: () =>
    set({
      tickets: [...defaultTickets],
      campingSelection: { ...defaultCampingSelection },
      timer: 0,
      timerActive: false,
      reservationId: null,
    }),
}));

export default useBookingStore;