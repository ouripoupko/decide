// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import agentReducer from "./reducers/AgentSlice";

const store = configureStore({
  reducer: {
    agent: agentReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
