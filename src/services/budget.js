import http from "./http";

const addBudget = (data) => {
  return http.post('budget', data);
}
const getAllBudget = () => {
  return http.get('budget');
}
const updateBudget = (id, data) => {
  return http.put(`budget/${id}`, data);
}
const deleteBudget = (id) => {
  return http.delete(`budget/${id}`);
}
const updateBudgetSpentAmount = (id, data) => {
  return http.patch(`budget/${id}`, data);
}
const getBudgetDetails = (id) => {
  return http.get(`budget/${id}`);
}

const budgetService = {
  addBudget,
  getAllBudget,
  updateBudget,
  deleteBudget,
  updateBudgetSpentAmount,
  getBudgetDetails,
};

export default budgetService;