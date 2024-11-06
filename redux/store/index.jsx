// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/UserSlice";
import fishReducer from "../reducers/FishSlice";
import orderReducer from "../reducers/OrderSlice";
import fishPackageReducer from "../reducers/FishPackageSlice";
import newsReducer from '../reducers/NewsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    fish: fishReducer,
    order: orderReducer,
    fishPackage: fishPackageReducer,
    news:newsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
