// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { glokiReducer } from "./reducers/glokiSlice";
import { communitiesReducer } from "./reducers/communitiesSlice";
import { communityReducer } from "./reducers/communitySlice";
import { currencyReducer } from "./reducers/currencySlice";
import { issuesReducer } from "./reducers/issuesSlice";
import { issueReducer } from "./reducers/issueSlice";

const store = configureStore({
  reducer: {
    gloki: glokiReducer,
    communities: communitiesReducer,
    community: communityReducer,
    currency: currencyReducer,
    issues: issuesReducer,
    issue: issueReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
