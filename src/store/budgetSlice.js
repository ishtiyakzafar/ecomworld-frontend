import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgetList: [],
  updateData: null,
  updateType: "",
  budgetDetails: {}
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    actionSetBudgetList(state, action) {
      state.budgetList = action.payload;
    },
    actionAddBudget(state, action) {
      state.budgetList = [action.payload, ...state.budgetList];
    },
    actionDeleteBudget(state, action) {
      state.budgetList = state.budgetList.filter((item) => item._id !== action.payload);
    },
    actionSetUpdateData(state, action) {
      state.updateData = action.payload.data;
      state.updateType = action.payload.type;
    },
    actionUpdateBudget(state, action) {
      const index = state.budgetList.findIndex((item) => item._id === action.payload._id);
      state.budgetList[index] = action.payload;
    },
    actionSetBudgetDetails(state, action) {
      state.budgetDetails = action.payload;
      const index = state.budgetList.findIndex((item) => item._id === action.payload._id);
      state.budgetList[index] = action.payload;
    },
    actionUpdateBudgetDetails(state, action) {
      const { spentAmount, expenseCount } = action.payload;
      state.budgetDetails.spentAmount = spentAmount;
      state.budgetDetails.expenseCount = expenseCount;
      const index = state.budgetList.findIndex((item) => item._id === state.budgetDetails._id);
      state.budgetList[index] = state.budgetDetails;
    },
  }
})

export const {
  actionSetBudgetList,
  actionAddBudget,
  actionDeleteBudget,
  actionSetUpdateData,
  actionUpdateBudget,
  actionSetBudgetDetails,
  actionUpdateBudgetDetails,
} = budgetSlice.actions;
export default budgetSlice.reducer;