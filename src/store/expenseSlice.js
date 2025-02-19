import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseList: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    actionSetExpense(state, action) {
      state.expenseList = action.payload;
    },
    actionAddExpense(state, action) {
      state.expenseList = [action.payload, ...state.expenseList];
    },
    actionDeleteExpense(state, action) {
      state.expenseList = state.expenseList.filter((item) => item._id !== action.payload);
    },
    actionUpdateExpense(state, action) {
      const index = state.expenseList.findIndex((item) => item._id === action.payload._id);
      state.expenseList[index] = action.payload;
    }
  }
})

export const {
  actionSetExpense,
  actionAddExpense,
  actionDeleteExpense,
  actionUpdateExpense,
} = expenseSlice.actions;
export default expenseSlice.reducer;