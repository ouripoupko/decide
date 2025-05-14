import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "community",
  initialState: {
    contract: undefined as string | undefined,
  },
  reducers: {
    setCommunityContract: (state, action) => {
      state.contract = action.payload;
    },
  },
  // extraReducers: (builder) => {
  // },
});

export const { setCommunityContract } = communitySlice.actions;
export const communityReducer = communitySlice.reducer;
