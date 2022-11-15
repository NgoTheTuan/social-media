import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    createPost: {
        pending: false,
        error: false,
    },
    allsPost: {
        pending: false,
        error: false,
    },
    likeOrDislike: {
        pending: false,
        error: false,
    },
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        createPostStart: (state) => {
            state.createPost.pending = true;
            state.createPost.error = false;
        },
        createPostSuccess: (state) => {
            state.createPost.pending = false;
            state.createPost.error = false;
        },
        createPostError: (state) => {
            state.createPost.pending = false;
            state.createPost.error = true;
        },
        allsPostStart: (state) => {
            state.allsPost.pending = true;
            state.allsPost.error = false;
        },
        allsPostSuccess: (state) => {
            state.allsPost.pending = false;
            state.allsPost.error = false;
        },
        allsPostError: (state) => {
            state.allsPost.pending = false;
            state.allsPost.error = true;
        },
        likeOrDislikeStart: (state) => {
            state.likeOrDislike.pending = true;
            state.likeOrDislike.error = false;
        },
        likeOrDislikeSuccess: (state) => {
            state.likeOrDislike.pending = false;
            state.likeOrDislike.error = false;
        },
        likeOrDislikeError: (state) => {
            state.likeOrDislike.pending = false;
            state.likeOrDislike.error = true;
        },
    },
});

export const {
    createPostStart,
    createPostSuccess,
    createPostError,
    allsPostStart,
    allsPostSuccess,
    allsPostError,
    likeOrDislikeStart,
    likeOrDislikeSuccess,
    likeOrDislikeError,
} = postSlice.actions;

export default postSlice.reducer;
