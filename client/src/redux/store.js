import { configureStore } from "@reduxjs/toolkit";
import seatReduer from "./seatSlice";

export const store = configureStore({
  reducer: {
    seats: seatReduer,
  },
});
