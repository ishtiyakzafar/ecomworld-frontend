import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFromCart: false,
  categoriesLoading: true,
  categories: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionIsFromCart(state, action) {
      state.isFromCart = action.payload;
    },
    actionCategoriesLoading(state, action) {
      state.categoriesLoading = action.payload;
    },
    actionSetCategories(state, action) {
      state.categories = action.payload;
    }
  }
})

export const {
  actionIsFromCart,
  actionCategoriesLoading,
  actionSetCategories,
} = appSlice.actions;
export default appSlice.reducer;