import React, { lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPrivateRoutes from "./config/AdminPrivateRoutes.jsx";
import CustomerRoutes from "./config/CustomerRoutes.jsx";
import AdminLayout from "./components/AdminLayout/AdminLayout.jsx";
import CustomerPrivateRoutes from "./config/CustomerPrivateRoutes.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actionSetCart, actionSetCartCount, actionSetWishlist, actionSetWishlistCount } from "./store/productSlice.js";
import cartService from "./services/cart.js";
import wishlistService from "./services/wishlist.js";
import { CUSTOMER_ROLE } from "./Helper/constant.js";
import categoryService from "./services/categories.js";
import { actionCategoriesLoading, actionSetCategories } from "./store/appSlice.js";

const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage.jsx"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation/OrderConfirmation.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const Layout = lazy(() => import("./components/Layout/Layout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound.jsx"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage/ProductDetailPage.jsx"));
const ProductList = lazy(() => import("./pages/Admin/ProductList/ProductList.jsx"));
const OrderDetails = lazy(() => import("./pages/Admin/OrderDetails/OrderDetails.jsx"));
const AddUpdateProduct = lazy(() => import("./pages/Admin/AddUpdateProduct/AddUpdateProduct.jsx"));
const CustomerList = lazy(() => import("./pages/Admin/CustomerList/CustomerList.jsx"));
const OrderList = lazy(() => import("./pages/Admin/OrderList/OrderList.jsx"));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin/AdminLogin.jsx"));
const CategoriesList = lazy(() => import("./pages/Admin/CategoriesList/CategoriesList.jsx"));
const WishListPage = lazy(() => import("./pages/WishListPage/WishListPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage/CartPage.jsx"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage/CheckoutPage.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs/ContactUs.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));


const App = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cart = await cartService.getCartProductCount();
        dispatch(actionSetCartCount(cart.cartCount));

        const wishlist = await wishlistService.getWishlistCount();
        dispatch(actionSetWishlistCount(wishlist.wishlistCount));
      } catch (error) {
        toast.error(error);
      }
    };

    if (isLoggedIn && user.role === CUSTOMER_ROLE) {
      fetchInitialData();
    }

    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getCategories();
        dispatch(actionSetCategories(categories));
      } catch (error) {
        toast.error(error);
      } finally {
        dispatch(actionCategoriesLoading(false));
      }
    }
    fetchCategories();
  }, [isLoggedIn])



  return (
    <Router>
      <Routes>
        {/* CUSTOMER ROUTES */}
        <Route element={<CustomerRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/:topLevel?/:secondLevel?/:thirdLevel?" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Route>

        <Route element={<CustomerPrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/profile/:slug" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<AdminPrivateRoutes />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/products/add" element={<AddUpdateProduct />} />
            <Route path="/admin/products/:id/update" element={<AddUpdateProduct />} />
            <Route path="/admin/customers" element={<CustomerList />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/orders/:id" element={<OrderDetails />} />
            <Route path="/admin/categories" element={<CategoriesList />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
};

export default App;