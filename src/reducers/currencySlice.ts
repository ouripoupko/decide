import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencyContractFromServer } from "src/server/communityAPI";
import {
  getBalanceFromServer,
  getParametersFromServer,
} from "src/server/currencyAPI";
import { RootState } from "src/Store";
import { IInvite } from "src/types/interfaces";

export const readAccount = createAsyncThunk<any, void>(
  "currency/readAccount",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { agent, server, allContracts } = state.gloki;
    const community = state.community.contract;
    console.log('entering readAccount', agent, server, community);
    console.log("all contracts:", allContracts);
    if (agent && server && community) {
      const invite = (await getCurrencyContractFromServer(
        server,
        agent,
        community
      )) as IInvite;
      console.log("invite:", invite);
      if (invite && invite.contract) {
        dispatch(setInvite(invite));
        if (allContracts.some((contract) => contract.id === invite.contract)) {
          dispatch(setContractExists(true));
          const balance = await getBalanceFromServer(
            server,
            agent,
            invite.contract
          );
          const { parameters, medians } = await getParametersFromServer(
            server,
            agent,
            invite.contract
          );
          return { balance, medians, parameters };
        }
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
    invite: undefined as IInvite | undefined,
    contractExists: false,
    balance: 0,
    parameters: { mint: 0, burn: 0 },
    preferences: { mint: 0, burn: 0 },
    partners: [],
  },
  reducers: {
    setInvite: (state, action) => {
      state.invite = action.payload;
    },
    setContractExists: (state, action) => {
      state.contractExists = action.payload;
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

export const { setInvite, setContractExists } = currencySlice.actions;
export default currencySlice.reducer;
