import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "community",
  initialState: {
    contract: undefined as string | undefined,
  },
  reducers: {
    setContract: (state, action) => {
      state.contract = action.payload;
    },
  },
  // extraReducers: (builder) => {
  // },
});

export const { setContract } = communitySlice.actions;
export const communityReducer = communitySlice.reducer;
