import http from "./http";


const getProducts = (query) => {
  const { categoryLevel, categoryParams, brandParams, colorParams, priceParams, sizeParams, discountParams, search, sortingParams } = query;

  let url = "products";

  if (categoryLevel) url += `?level=${categoryLevel}`;
  if (categoryParams) url += `&category=${categoryParams}`;
  if (brandParams) url += `&brand=${brandParams}`;
  if (colorParams) url += `&color=${colorParams}`;
  if (priceParams) url += `&price=${priceParams}`;
  if (sizeParams) url += `&size=${sizeParams}`;
  if (discountParams) url += `&discount=${discountParams}`;
  if (sortingParams) url += `&sort=${sortingParams}`;
  if (search) url += `?search=${search}`;

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
const getBrands = () => {
  return http.get('products/brands');
}
const getColors = () => {
  return http.get('products/colors');
}

const productService = {
  getProducts,
  getNewArrivalProduct,
  getOnSaleProduct,
  getBestSellerProduct,
  createProduct,
  productDetails,
  getProductsWithTags,
  deleteProduct,
  updateProduct,
  getBrands,
  getColors,
};

export default productService;