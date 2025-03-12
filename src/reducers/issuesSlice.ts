import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCommunitySubContractFromServer } from "src/server/communityAPI";
import { getIssuesFromServer } from "src/server/issuesApi";
import { RootState } from "src/Store";
import { IInvite, IIssue } from "src/types/interfaces";

export const readIssuesContract = createAsyncThunk<any, void>(
  "issues/readIssuesContract",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { agent, server, allContracts } = state.gloki;
    const community = state.community.contract;
    if (agent && server && community) {
      const invite = (await getCommunitySubContractFromServer(
        server,
        agent,
        community,
        "issues"
      )) as IInvite;
      if (invite && invite.contract) {
        dispatch(setInvite(invite));
        return allContracts.some((contract) => contract.id === invite.contract);
      }
    }
    return Promise.reject();
  }
);

export const readIssues = createAsyncThunk<any, void>(
  "issues/readIssues",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server } = state.gloki;
    const { invite, contractExists } = state.issues;
    if (agent && server && contractExists && invite.contract) {
      return getIssuesFromServer(server, agent, invite.contract);
    }
    return Promise.reject();
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    invite: {} as IInvite,
    contractExists: false,
    issues: [] as IIssue[],
  },
  reducers: {
    setInvite: (state, action) => {
      state.invite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readIssuesContract.fulfilled, (state, action) => {
      state.contractExists = action.payload;
    });
    builder.addCase(readIssues.fulfilled, (state, action) => {
      state.issues = action.payload;
    });
  },
});

export const { setInvite } = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;
