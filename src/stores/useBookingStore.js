import { create } from "zustand";

const useBookingStore = create((set) => ({
  tickets: [
    { id: 1, title: "Foo-Billet", price: 799, quantity: 0 },
    { id: 2, title: "VIP-Billet", price: 1299, quantity: 0 },
  ],
  campingSelection: {
    area: null,
    tents: { twoPerson: 0, threePerson: 0 },
    greenCamping: false,
  },
  updateTickets: (updatedTickets) => {
    set((state) => {
      const totalTickets = updatedTickets.reduce(
        (total, ticket) => total + ticket.quantity,
        0
      );

      // Reducer teltvalgene, hvis nødvendigt
      const totalTents =
        state.campingSelection.tents.twoPerson +
        state.campingSelection.tents.threePerson;

      let updatedTents = { ...state.campingSelection.tents };

      if (totalTents > totalTickets) {
        const scaleFactor = totalTickets / totalTents;

        updatedTents = {
          twoPerson: Math.floor(updatedTents.twoPerson * scaleFactor),
          threePerson: Math.floor(updatedTents.threePerson * scaleFactor),
        };
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
  updateCampingSelection: (updatedCamping) =>
    set((state) => ({
      campingSelection: { ...state.campingSelection, ...updatedCamping },
    })),
  resetBooking: () => set({
    tickets: [
      { id: 1, title: "Foo-Billet", price: 799, quantity: 0 },
      { id: 2, title: "VIP-Billet", price: 1299, quantity: 0 },
    ],
    campingSelection: {
      area: null,
      tents: { twoPerson: 0, threePerson: 0 },
      greenCamping: false,
    },
  }),
}));

export default useBookingStore;