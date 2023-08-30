import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PERSIST,PURGE,REGISTER, PAUSE} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { userSlice } from "./Auth/UserSlice.jsx"
import { restaurantSlice } from "./Auth/RestaurantSlice.jsx";
const persistConfig = { key:'user',storage,version:1};
const restaurantPersistConfig = { key:'restaurant',storage,version:1};
// const adminPersistConfig = { key: 'Admin', storage, version: 1 };

const userPersistReducer = persistReducer(persistConfig,userSlice.reducer);
const restaurantPersistReducer = persistReducer(restaurantPersistConfig,restaurantSlice.reducer);
// const adminPersistReducer = persistReducer(adminPersistConfig, AdminAuth.reducer);


export const Store = configureStore({
    reducer: {
        user: userPersistReducer,
        restaurant:restaurantPersistReducer
        // Admin: adminPersistReducer,
    },
    middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
});


export const persistor = persistStore(Store);