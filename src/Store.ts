// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import glokiReducer from "./reducers/GlokiSlice";
import communitiesReducer from "./reducers/communitiesSlice";
import communityReducer from "./reducers/communitySlice";
import currencyReducer from "./reducers/currencySlice";

const store = configureStore({
  reducer: {
    gloki: glokiReducer,
    communities: communitiesReducer,
    community: communityReducer,
    currency: currencyReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
