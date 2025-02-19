import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  shippingAddress: {}
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    actionAddAddress(state, action) {
      state.addresses = [action.payload, ...state.addresses];
    },
    actionSetAddress(state, action) {
      state.addresses = action.payload;
    },
    actionDeleteAddress(state, action) {
      state.addresses = state.addresses.filter((item) => item._id !== action.payload);
    },
    actionUpdateAddress(state, action) {
      const index = state.addresses.findIndex((item) => item._id === action.payload._id);
      state.addresses[index] = action.payload;
    },
    actionSetShippingAddress(state, action) {
      state.shippingAddress = action.payload;
    },
  }
})

export const {
  actionAddAddress,
  actionSetAddress,
  actionDeleteAddress,
  actionUpdateAddress,
  actionSetShippingAddress,
} = addressSlice.actions;
export default addressSlice.reducer;