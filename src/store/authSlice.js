import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        token: "",
        id: "",
        email: "",
        name: "",
    },
    isLoggedIn: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        actionLogin(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        actionLogout(state, action) {
            localStorage.removeItem('user');
            localStorage.removeItem('cart');
            state.user = initialState.user;
            state.isLoggedIn = initialState.isLoggedIn;
        },
        actionUpdateUser(state, action) {
            state.user.email = action.payload.email;
            state.user.name = action.payload.name;

            const user = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({ ...user, email: action.payload.email, name: action.payload.name }));
        },
    }
})

export const {
    actionLogin,
    actionLogout,
    actionUpdateUser,
} = authSlice.actions;
export default authSlice.reducer;