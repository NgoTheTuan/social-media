import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    createComment: {
        pending: false,
        error: false,
    },
    getAllComment: {
        pending: false,
        error: false,
    },
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        createCommentStart: (state) => {
            state.createComment.pending = true;
            state.createComment.error = false;
        },
        createCommentSuccess: (state) => {
            state.createComment.pending = false;
            state.createComment.error = false;
        },
        createCommentError: (state) => {
            state.createComment.pending = false;
            state.createComment.error = true;
        },
        getAllCommentStart: (state) => {
            state.createComment.pending = true;
            state.createComment.error = false;
        },
        getAllCommentSuccess: (state) => {
            state.createComment.pending = false;
            state.createComment.error = false;
        },
        getAllCommentError: (state) => {
            state.createComment.pending = false;
            state.createComment.error = true;
        },
    },
});

export const {
    createCommentStart,
    createCommentSuccess,
    createCommentError,
    getAllCommentStart,
    getAllCommentSuccess,
    getAllCommentError,
} = commentSlice.actions;

export default commentSlice.reducer;
