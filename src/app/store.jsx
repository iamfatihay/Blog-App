import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import blogReducer from "../features/blogSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// localStorage.setItem("user", user)

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    migrate: (state) => {
        // Migration logic if needed
        return Promise.resolve(state);
    },
};
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedReducer,
        blog: blogReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/REGISTER",
                    "persist/PAUSE",
                    "persist/PURGE",
                    "persist/FLUSH",
                    "persist/PAUSE",
                    "persist/PERSIST",
                ],
                ignoredActionsPaths: [
                    "meta.arg",
                    "payload.timestamp",
                    "register",
                    "meta.baseQueryMeta.request",
                    "meta.baseQueryMeta.response",
                    "persist",
                ],
                ignoredPaths: [
                    "items.dates",
                    "register",
                    "_persist",
                    "persist",
                    "auth._persist",
                    "blog._persist",
                ],
            },
            immutableCheck: {
                ignoredPaths: ["_persist"],
            },
        }),
    devTools: process.env.NODE_ENV !== "production",
});

export let persistor = persistStore(store);
export default store;
