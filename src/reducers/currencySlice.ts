import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCommunitySubContractFromServer } from "src/server/communityAPI";
import {
  getAccountsFromServer,
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
    if (agent && server && community) {
      const invite = (await getCommunitySubContractFromServer(
        server,
        agent,
        community,
        "currency"
      )) as IInvite;
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

export const readAccountsList = createAsyncThunk<any, void>(
  "currency/readAccountsList",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server } = state.gloki;
    const invite = state.currency.invite;
    if (agent && server && invite.contract) {
      const accounts = await getAccountsFromServer(server, agent, invite.contract);
      return accounts;
    }
    return Promise.reject();
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    invite: {} as IInvite,
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
    builder.addCase(readAccountsList.fulfilled, (state, action) => {
      state.partners = action.payload;
    });
  },
});

export const { setInvite, setContractExists } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
