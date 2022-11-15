import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: {
        currentUser: null,
        isFetching: false,
        success: false,
        error: false,
        message: null,
    },
    register: {
        isFetching: false,
        success: false,
        error: false,
        message: null,
    },
    logout: {
        success: false,
        error: false,
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.error = false;
            state.login.success = true;
            state.login.currentUser = action.payload;
        },
        loginError: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.login.success = false;
            state.login.message = action.payload;
        },
        logoutSuccess: (state) => {
            state.logout.success = true;
            state.login.success = false;
            state.login.currentUser = null;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerError: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
    },
});

export const { loginStart, loginSuccess, loginError, logoutSuccess, registerStart, registerSuccess, registerError } =
    authSlice.actions;

export default authSlice.reducer;
