import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pricingData: null,
  contactMessage: "",
};

const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    setPricingData: (state, action) => {
      state.data = action.payload;
      state.contactMessage = action.payload.contactMessage;
      state.destination = action.payload.destination;
    },
    clearPricingData: (state) => {
      state.pricingData = null;
      state.contactMessage = "";
      state.destination = null;
    },
  },
});

export const { setPricingData, clearPricingData } = pricingSlice.actions;
export default pricingSlice.reducer;
