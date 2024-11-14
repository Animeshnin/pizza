import {configureStore} from '@reduxjs/toolkit'
import filterSlice from "./slices/filter/slice";
import pizzasSlice from "./slices/pizzasSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CartSlice from "./slices/cart/slice";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, CartSlice)


export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: persistedReducer,
        pizzas: pizzasSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
            }
        })

})
export const persistor = persistStore(store);
export  type RootState = ReturnType<typeof  store.getState>