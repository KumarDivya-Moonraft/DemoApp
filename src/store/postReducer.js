import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../services/service";

const authSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        postDetails: {},
        loading: false,
    },
    reducers: {
        postLoadingStart: (state) => {
            state.loading = true;
            state.posts = [];
        },
        postSuccess: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        },
        resetPost: (state) => {
            state.posts = [];
            state.postDetails = {};
            state.loading = false;
        }
    }
});

const getPosts = () => async (dispatch) => {
    try {
        dispatch(postLoadingStart());
        const response = await axiosInstance.get('/posts');
        if (response) {
            dispatch(postSuccess(response.data));
        }
    } catch (error) {
        console.log("Something is wrong");
    }
}

const { postSuccess, resetPost,postLoadingStart } = authSlice.actions;

export {
    getPosts,
    resetPost
};

export default authSlice.reducer;