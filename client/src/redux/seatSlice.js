import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seats: [],
  totalPrice: 0,
};

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    addSeat: (state, action) => {
      state.seats.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    removeSeat: (state, action) => {
      state.seats = state.seats.filter((seat) => seat.id !== action.payload.id);
      state.totalPrice -= action.payload.price;
    },
    clearSeats: (state) => {
      state.seats = [];
      state.totalPrice = 0;
      return state;
    },
  },
});

export const { addSeat, removeSeat, clearSeats } = seatSlice.actions;

export default seatSlice.reducer;
