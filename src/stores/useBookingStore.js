import { create } from "zustand";
import { reserveSpot, fullfillReservation } from "../lib/database";

// Standarddata for billetter og campingområder
const defaultTickets = [
  { id: 1, title: "Foo-Billet", price: 799, quantity: 0 },
  { id: 2, title: "VIP-Billet", price: 1299, quantity: 0 },
];

const defaultCampingSelection = {
  area: null,
  tents: { twoPerson: 0, threePerson: 0 },
  greenCamping: false,
  areas: [],
};

const useBookingStore = create((set, get) => ({
  tickets: [...defaultTickets],
  campingSelection: { ...defaultCampingSelection },
  timer: 0,
  timerActive: false,
  reservationId: null,

  // Sæt timer
  setTimer: (time) => set({ timer: time, timerActive: true }),

  // Dekrementer timer
  decrementTimer: () =>
    set((state) => ({
      timer: state.timer > 0 ? state.timer - 1 : 0,
      timerActive: state.timer > 0,
    })),

  // Stop timer
  stopTimer: () => set({ timerActive: false, timer: 0 }),

  // Sæt reservation ID
  setReservationId: (id) => set({ reservationId: id }),

  // Nulstil kurv og campingvalg
  resetBasket: () =>
    set({
      tickets: [...defaultTickets],
      campingSelection: { ...defaultCampingSelection },
    }),

  // Opret reservation
  createReservation: async (area, amount) => {
    try {
      const { id, timeout } = await reserveSpot(area, amount);
      set({ reservationId: id, timer: timeout / 1000, timerActive: true });
      return id; // Returnér ID for yderligere brug
    } catch (error) {
      console.error("Fejl ved oprettelse af reservation:", error);
      return null; // Returnér null ved fejl
    }
  },

  // Fuldfør reservation
  completeReservation: async () => {
    const { reservationId } = get();
    if (!reservationId) return;

    try {
      const response = await fullfillReservation(reservationId);
      set({ reservationId: null, timer: 0, timerActive: false });
      return response;
    } catch (error) {
      console.error("Fejl ved fuldførelse af reservation:", error);
      return null;
    }
  },

  // Opdater billetter
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

      return {
        ...state,
        tickets: updatedTickets,
        campingSelection: {
          ...state.campingSelection,
          tents: updatedTents,
        },
      };
    });
  },

  // Opdater campingvalg
  updateCampingSelection: (updatedCamping) =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        ...updatedCamping,
      },
    })),

  // Nulstil booking
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