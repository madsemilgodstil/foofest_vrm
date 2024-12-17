import { create } from 'zustand'
import { reserveSpot, fullfillReservation } from '../lib/database'

const defaultTickets = [
  { id: 1, title: 'Foo - Ticket', price: 799, quantity: 0 },
  { id: 2, title: 'VIP - Ticket', price: 1299, quantity: 0 }
]

const defaultCampingSelection = {
  area: null,
  tents: { twoPerson: 0, threePerson: 0 },
  greenCamping: false,
  areas: []
}

const useBookingStore = create((set, get) => ({
  tickets: [...defaultTickets],
  campingSelection: { ...defaultCampingSelection },
  timer: 0,
  timerActive: false,
  reservationId: null,

  setTimer: time => set({ timer: time, timerActive: true }),

  decrementTimer: () =>
    set(state => ({
      timer: state.timer > 0 ? state.timer - 1 : 0,
      timerActive: state.timer > 0
    })),

  stopTimer: () => set({ timerActive: false, timer: 0 }),

  setReservationId: id => set({ reservationId: id }),

  resetBasket: () =>
    set({
      tickets: [...defaultTickets],
      campingSelection: { ...defaultCampingSelection }
    }),

  createReservation: async (area, amount) => {
    try {
      const { id, timeout } = await reserveSpot(area, amount)
      set({
        reservationId: id,
        timer: timeout / 1000,
        timerActive: true
      })
      return id
    } catch (error) {
      console.error('Fejl ved oprettelse af reservation:', error)
      return null
    }
  },

  completeReservation: async () => {
    const { reservationId } = get()
    if (!reservationId) {
      console.error('Ingen reservations-ID fundet.')
      return null
    }

    try {
      const response = await fullfillReservation(reservationId)
      set({ reservationId: null, timer: 0, timerActive: false })
      return response
    } catch (error) {
      console.error('Fejl ved fuldførelse af reservation:', error)
      return null
    }
  },

  updateTickets: updatedTickets => {
    set(state => {
      const totalTickets = updatedTickets.reduce(
        (total, ticket) => total + ticket.quantity,
        0
      )

      const totalTents =
        state.campingSelection.tents.twoPerson +
        state.campingSelection.tents.threePerson

      let updatedTents = { ...state.campingSelection.tents }
      if (totalTents > totalTickets) {
        while (
          updatedTents.twoPerson + updatedTents.threePerson >
          totalTickets
        ) {
          if (updatedTents.threePerson > 0) {
            updatedTents.threePerson -= 1
          } else if (updatedTents.twoPerson > 0) {
            updatedTents.twoPerson -= 1
          }
        }
      }

      return {
        ...state,
        tickets: updatedTickets,
        campingSelection: {
          ...state.campingSelection,
          tents: updatedTents
        }
      }
    })
  },

  updateCampingSelection: updatedCamping =>
    set(state => ({
      campingSelection: {
        ...state.campingSelection,
        ...updatedCamping
      }
    })),

  getReservationId: () => get().reservationId,

  resetBooking: () =>
    set({
      tickets: [...defaultTickets],
      campingSelection: { ...defaultCampingSelection },
      timer: 0,
      timerActive: false,
      reservationId: null
    })
}))

export default useBookingStore
