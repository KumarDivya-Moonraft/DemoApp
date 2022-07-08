import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../services/service";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        authToken: null,
        refreshToken: null,
        user: {},
        loading: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.authToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
            state.loading = false;
        },
        setToken: (state, action) => {
            state.authToken = action.payload.accessToken;
        },
        logoutSuccess: (state, action) => {
            state.isLoggedIn = false;
            state.authToken = null;
            state.refreshToken = null;
            state.user = {};
            state.loading = false;
        },
        authLoadingStart: (state, action)=>{
            state.loading= true;
        },
    }
});

const { loginSuccess, setToken,logoutSuccess,authLoadingStart } = authSlice.actions;

const login = (user) => async (dispatch, getState) => {
    try {
        dispatch(authLoadingStart());
        const response = await axiosInstance.post('/login', { ...user });
        if (response) {
            dispatch(loginSuccess({ ...response.data }));
        }
    } catch (error) {
        console.log("Something went wrong while logging in ",error);
    }
}

const logout = () => async (dispatch, getState) => {
    try {
        dispatch(authLoadingStart());
        const response = await axiosInstance.post('/logout');
        if (response) {
            dispatch(logoutSuccess());
        }
    } catch (error) {
        console.log("Something went wrong while logging out ",error);
    }
}


export {
    login,
    loginSuccess,
    setToken,
    logout
};

export default authSlice.reducer;