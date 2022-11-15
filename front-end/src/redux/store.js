import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postSlice from './postSlice';
import commentSlice from './commentSlice';
// import userSlice from './userSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'user'],
};

const combinedReducer = combineReducers({
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
});

const rootReducer = (state, action) => {
    if (action.type === 'auth/logoutSuccess') {
        state = undefined;
    }
    return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
