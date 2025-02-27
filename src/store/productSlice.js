import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const localCart = JSON.parse(localStorage.getItem('cart'));

const initialState = {
  cart: localCart || [],
  cartCount: localCart && localCart.length || 0,
  wishlist: [],
  wishlistCount: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    actionSetCart(state, action) {
      state.cart = action.payload;
    },

    actionAddToCart(state, action) {
      const { product, size } = action.payload;
      const index = state.cart.findIndex((item) => item.product._id === product._id && item.size === size);
      const user = JSON.parse(localStorage.getItem('user'));

      if (index === -1) {
        state.cart = [{ _id: Date.now(), product, size, quantity: 1 }, ...state.cart];
        state.cartCount = state.cartCount + 1;
        toast.success("Product added to your cart");
        if (!user) localStorage.setItem('cart', JSON.stringify(state.cart));
      } else {
        if (state.cart[index].product.size.find((item) => item.name === size).quantity > state.cart[index].quantity) {
          state.cart[index].quantity += 1;
          toast.success("Product quantity increase by 1 in your cart");
          if (!user) localStorage.setItem('cart', JSON.stringify(state.cart));
        } else {
          toast.error('You have already added the maximum quantity to cart');
        }
      }
    },

    actionRemoveFromCart(state, action) {
      const user = JSON.parse(localStorage.getItem('user'));
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      state.cartCount = state.cartCount - 1;
      // toast.error('Product remove from your cart');
      if (!user) localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    actionIncQty(state, action) {
      const user = JSON.parse(localStorage.getItem('user'));
      const index = state.cart.findIndex((item) => item._id === action.payload);

      if (state.cart[index].product.size.find((item) => item.name === state.cart[index].size).quantity > state.cart[index].quantity) {
        state.cart[index].quantity += 1;
        state.cartCount = state.cartCount + 1;
        if (!user) localStorage.setItem('cart', JSON.stringify(state.cart));
      } else {
        toast.error('You have already added the maximum quantity to cart');
      }
    },

    actionDecQty(state, action) {
      const user = JSON.parse(localStorage.getItem('user'));
      const index = state.cart.findIndex((item) => item._id === action.payload);

      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
        state.cartCount = state.cartCount - 1;
        if (!user) localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },

    actionSetWishlist(state, action) {
      state.wishlist = action.payload;
    },

    actionAddToWishlist(state, action) {
      state.wishlist = [action.payload, ...state.wishlist];
      state.wishlistCount = state.wishlistCount + 1;
    },

    actionRemoveFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
      state.wishlistCount = state.wishlistCount - 1;
    },

    actionMoveToCart(state, action) {
      state.wishlist = action.payload;
    },

    actionSetCartCount(state, action) {
      state.cartCount = action.payload;
    },

    actionSetWishlistCount(state, action) {
      state.wishlistCount = action.payload;
    },



  }
})

export const {
  actionSetCart,
  actionAddToCart,
  actionRemoveFromCart,
  actionIncQty,
  actionDecQty,
  actionSetWishlist,
  actionAddToWishlist,
  actionRemoveFromWishlist,
  actionMoveToCart,
  actionSetCartCount,
  actionSetWishlistCount,
} = productSlice.actions;
export default productSlice.reducer;