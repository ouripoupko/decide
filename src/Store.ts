// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import glokiReducer from "./reducers/GlokiSlice";

const store = configureStore({
  reducer: {
    gloki: glokiReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
