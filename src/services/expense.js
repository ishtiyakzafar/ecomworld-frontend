import http from "./http";

const addExpense = (data) => {
  return http.post('expense', data);
}
const getExpense = () => {
  return http.get('expense');
}
const updateExpense = (id, data) => {
  return http.put(`expense/${id}`, data);
}
const deleteExpense = (id) => {
  return http.delete(`expense/${id}`);
}
const getExpensesByBudgetId = (id) => {
  return http.get(`expense/${id}`);
}



const expenseService = {
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  getExpensesByBudgetId,
};

export default expenseService;