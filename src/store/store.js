import { configureStore } from '@reduxjs/toolkit';
import authReducer, { actionLogin } from './authSlice';
import productReducer, { actionSetCart } from './productSlice';
import addressReducer from './addressSlice';
import appReducer from './appSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        address: addressReducer,
        app: appReducer,
    }
})

const user = JSON.parse(localStorage.getItem('user'));

if (user) {
    store.dispatch(actionLogin(user));
}

const cart = JSON.parse(localStorage.getItem('cart'));

if (cart) {
    store.dispatch(actionSetCart(cart));
}


export default store;