import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/Store";

export const readAccount = createAsyncThunk<any, void>(
  "currency/readAccount",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server } = state.gloki;
    if (agent && server) {
      return { balance: 0, parameters: {}, preferences: {} };
    }
    return Promise.reject();
  }
);

export const readPartners = createAsyncThunk<any, void>(
    "currency/readPartners",
    async (_, { getState }) => {
      const state = getState() as RootState;
      const { agent, server } = state.gloki;
      if (agent && server) {
        return { balance: 0, parameters: {}, preferences: {} };
      }
      return Promise.reject();
    }
  );
  
const currencySlice = createSlice({
  name: "currency",
  initialState: {
    balance: 0,
    parameters: {mint: 0, burn: 0},
    preferences: {mint: 0, burn: 0},
    partners: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readAccount.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
    });
  },
});

export default currencySlice.reducer;
