import { configureStore, } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import { persistReducer,persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import postReducer from "./postReducer";

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
};

const appReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    post: postReducer,
});

const store = configureStore({
    reducer: appReducer,
    middleware: [thunk]
});

export const persistor= persistStore(store);

export default store;