import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencyContractFromServer } from "src/server/communityAPI";
import { getBalanceFromServer, getParametersFromServer } from "src/server/currencyAPI";
import { RootState } from "src/Store";

export const readAccount = createAsyncThunk<any, void>(
  "currency/readAccount",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { agent, server } = state.gloki;
    const community = state.community.contract;
    if (agent && server && community) {
      const currency = await getCurrencyContractFromServer(server, agent, community);
      if (currency) {
        dispatch(setContract(currency))
        const balance = await getBalanceFromServer(server, agent, currency);
        const {parameters, medians} = await getParametersFromServer(server, agent, currency);
        return { balance, medians, parameters };
      }
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
    contract: undefined as string | undefined,
    balance: 0,
    parameters: { mint: 0, burn: 0 },
    preferences: { mint: 0, burn: 0 },
    partners: [],
  },
  reducers: {
    setContract: (state, action) => {
      state.contract = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readAccount.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
      state.parameters = action.payload.medians;
      state.preferences = action.payload.parameters;
    });
  },
});

export const { setContract } = currencySlice.actions;
export default currencySlice.reducer;
