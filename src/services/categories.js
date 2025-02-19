import http from "./http";

const createTopLevelCategory = (data) => {
  return http.post('categories/toplevelcategory', data);
}
const createSecondLevelCategory = (data) => {
  return http.post('categories/secondlevelcategory', data);
}
const createThirdLevelCategory = (data) => {
  return http.post('categories/thirdlevelcategory', data);
}
const getCategories = () => {
  return http.get('categories');
}
const deleteTopLevelCategory = (data) => {
  return http.post('categories/delete/toplevelcategory', data);
}
const deleteSecondLevelCategory = (data) => {
  return http.post('categories/delete/secondlevelcategory', data);
}
const deleteThirdLevelCategory = (data) => {
  return http.post('categories/delete/thirdlevelcategory', data);
}
const updateTopLevelCategory = (data) => {
  return http.post('categories/update/toplevelcategory', data);
}
const updateSecondLevelCategory = (data) => {
  return http.post('categories/update/secondlevelcategory', data);
}
const updateThirdLevelCategory = (data) => {
  return http.post('categories/update/thirdlevelcategory', data);
}


const categoryService = {
  createTopLevelCategory,
  createSecondLevelCategory,
  createThirdLevelCategory,
  getCategories,
  deleteTopLevelCategory,
  deleteSecondLevelCategory,
  deleteThirdLevelCategory,
  updateTopLevelCategory,
  updateSecondLevelCategory,
  updateThirdLevelCategory,
};

export default categoryService;