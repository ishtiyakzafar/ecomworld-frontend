import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFromCart: false,
  categories: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionIsFromCart(state, action) {
      state.isFromCart = action.payload;
    },
    actionSetCategories(state, action) {
      state.categories = action.payload;
    }
  }
})

export const {
  actionIsFromCart,
  actionSetCategories,
} = appSlice.actions;
export default appSlice.reducer;