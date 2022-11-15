import request from './createHttp';
import setAuthToken from './setAuthToken';

import {
    loginStart,
    loginSuccess,
    loginError,
    logoutSuccess,
    registerStart,
    registerSuccess,
    registerError,
} from '../redux/authSlice';

import {
    createPostStart,
    createPostSuccess,
    createPostError,
    allsPostStart,
    allsPostSuccess,
    allsPostError,
    likeOrDislikeStart,
    likeOrDislikeSuccess,
    likeOrDislikeError,
} from '../redux/postSlice';

import {
    createCommentStart,
    createCommentSuccess,
    createCommentError,
    getAllCommentStart,
    getAllCommentSuccess,
    getAllCommentError,
} from '../redux/commentSlice';

const token = localStorage.getItem('social-token');

// Auth
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await request.post('auth/login', user);
        if (res.data.success) {
            dispatch(loginSuccess(res.data.user));
            setAuthToken(res.data.accessToken);
            navigate('/');
        }
    } catch (error) {
        dispatch(loginError());
    }
};

export const logoutUser = (dispatch, navigate) => {
    dispatch(logoutSuccess());
    setAuthToken(null);
    navigate('/login');
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await request.post('auth/register', user);
        if (res.data.success) {
            dispatch(registerSuccess(res.data.user));
            navigate('/login');
        }
    } catch (error) {
        dispatch(registerError());
    }
};

// User
export const getUser = async (userId) => {
    try {
        const res = await request.get(`users?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.data.success) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getFriendUser = async (userId) => {
    try {
        const res = await request.get(`users/friend?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.data.success) {
            return res.data.friendFollowing;
        }
    } catch (error) {
        console.log(error);
    }
};

// Post
export const createPost = async (post, dispatch) => {
    dispatch(createPostStart());
    try {
        const res = await request.post('post', post, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.data.success) {
            dispatch(createPostSuccess(res.data.user));
        }
    } catch (error) {
        dispatch(createPostError());
    }
};

export const allsPost = async (userId, dispatch) => {
    dispatch(allsPostStart());
    try {
        const res = await request.get(`post/timeline/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.data.success) {
            dispatch(allsPostSuccess(res.data.user));

            return res.data.allsPost;
        }
    } catch (error) {
        dispatch(allsPostError());
    }
};

export const likeOrDislikePost = async (postId, userId, dispatch) => {
    dispatch(likeOrDislikeStart());
    try {
        const res = await request.put(
            `post/${postId}/like`,
            {
                userId: userId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        console.log(res);

        if (res.data.success) {
            dispatch(likeOrDislikeSuccess(res.data.user));

            return res.data.allsPost;
        }
    } catch (error) {
        dispatch(likeOrDislikeError());
    }
};

export const userPost = async (userId, dispatch) => {
    try {
        const res = await request.get(`post/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.data.success) {
            return res.data.post;
        }
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (postId, userId) => {
    try {
        const res = await request.delete(`post/?idPost=${postId}&idUser=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);

        if (res.data.success) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};

// Comment

export const createComment = async (comment, dispatch) => {
    dispatch(createCommentStart());
    try {
        const res = await request.post('comment', comment, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(res);

        if (res.data.success) {
            dispatch(createCommentSuccess(res.data.user));

            return res.data.allsPost;
        }
    } catch (error) {
        dispatch(createCommentError());
    }
};

export const getAllComment = async (postId, dispatch) => {
    dispatch(getAllCommentStart());
    try {
        const res = await request.get(`comment/getall/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.data.success) {
            dispatch(getAllCommentSuccess(res.data.user));

            return res.data.allsComment;
        }
    } catch (error) {
        dispatch(getAllCommentError());
    }
};

// Conversation
export const getAllConversation = async (userId) => {
    try {
        const res = await request.get(`conversations/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.data.success) {
            return res.data.conversation;
        }
    } catch (error) {
        console.log(error);
    }
};

//Message

export const getAllMessages = async (conversationId) => {
    try {
        const res = await request.get(`messages/${conversationId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.data.success) {
            return res.data.messages;
        }
    } catch (error) {
        console.log(error);
    }
};

export const createMessages = async (message) => {
    try {
        const res = await request.post(`messages`, message, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.data.success) {
            return res.data.savedMessage;
        }
    } catch (error) {
        console.log(error);
    }
};
