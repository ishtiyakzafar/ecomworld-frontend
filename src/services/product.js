import http from "./http";


const getAllProducts = () => {
  return http.get('products');
}

const getProductsByCategory = (slug1, slug2, slug3) => {

  let url = "products/categories";

  if (slug1) url += `/${slug1}`;
  if (slug2) url += `/${slug2}`;
  if (slug3) url += `/${slug3}`;

  return http.get(url);
}

const getNewArrivalProduct = () => {
  return http.get('products/new_arrival');
}

const getOnSaleProduct = () => {
  return http.get('products/on_sale');
}

const getBestSellerProduct = () => {
  return http.get('products/best_seller');
}

const createProduct = (data) => {
  return http.post('products', data);
}

const productDetails = (id) => {
  return http.get(`products/${id}`);
}

const getProductsWithTags = () => {
  return http.get('products/tags');
}
const deleteProduct = (id) => {
  return http.delete(`products/${id}`);
}
const updateProduct = (data, id) => {
  return http.put(`products/${id}`, data);
}

const productService = {
  getAllProducts,
  getProductsByCategory,
  getNewArrivalProduct,
  getOnSaleProduct,
  getBestSellerProduct,
  createProduct,
  productDetails,
  getProductsWithTags,
  deleteProduct,
  updateProduct,
};

export default productService;