import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFromCart: false,
  categoriesLoading: true,
  categories: [],
  brands: [],
  colors: [],
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
    },
    actionSetBrands(state, action) {
      state.brands = action.payload;
    },
    actionSetColors(state, action) {
      state.colors = action.payload;
    }
  }
})

export const {
  actionIsFromCart,
  actionCategoriesLoading,
  actionSetCategories,
  actionSetBrands,
  actionSetColors,
} = appSlice.actions;
export default appSlice.reducer;