import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCommunitySubContractFromServer } from "src/server/communityAPI";
import { getIssuesFromServer } from "src/server/discussionApi";
import { RootState } from "src/Store";
import { IInvite } from "src/types/interfaces";

export const readDiscussionContract = createAsyncThunk<any, void>(
  "discussion/readDiscussionContract",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { agent, server, allContracts } = state.gloki;
    const community = state.community.contract;
    if (agent && server && community) {
      const invite = (await getCommunitySubContractFromServer(
        server,
        agent,
        community,
        "discussion"
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
  "discussion/readIssues",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server } = state.gloki;
    const { invite, contractExists } = state.discussion;
    if (agent && server && contractExists && invite.contract) {
      return getIssuesFromServer(server, agent, invite.contract);
    }
    return Promise.reject();
  }
);

const discussionSlice = createSlice({
  name: "discussion",
  initialState: {
    invite: {} as IInvite,
    contractExists: false,
    issues: [],
  },
  reducers: {
    setInvite: (state, action) => {
      state.invite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readDiscussionContract.fulfilled, (state, action) => {
      state.contractExists = action.payload;
    });
    builder.addCase(readIssues.fulfilled, (state, action) => {
      state.issues = action.payload;
    });
  },
});

export const { setInvite } = discussionSlice.actions;
export const discussionReducer = discussionSlice.reducer;
