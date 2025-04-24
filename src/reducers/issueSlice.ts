import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCommunitySubContractFromServer } from "src/server/communityAPI";
import { getIssuesFromServer } from "src/server/issuesApi";
import { RootState } from "src/Store";
import { IInvite } from "src/types/interfaces";


export const addComment = createAsyncThunk<any, any>(
  "issue/addComment",
  async (something) => {
    console.log(something)
  }
);

export const addProposal = createAsyncThunk<any, any>(
  "issue/addProposal",
  async (something) => {
    console.log(something)
  }
);

export const submitVote = createAsyncThunk<any, any>(
  "issue/submitVote",
  async (something) => {
    console.log(something)
  }
);

export const loadOutcome = createAsyncThunk<any, any>(
  "issue/loadOutcome",
  async (something) => {
    console.log(something)
  }
);

export const readIssuesContract = createAsyncThunk<any, void>(
  "issue/readIssuesContract",
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
  "issue/readIssues",
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

const issueSlice = createSlice({
  name: "issue",
  initialState: {
    description: "",
    proposals: [] as string[], 
    votes: {} as {[agent: string]: number},
  },
  reducers: {
    setInvite: (state, action) => {
      // state.invite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readIssuesContract.fulfilled, (state, action) => {
      // state.contractExists = action.payload;
    });
    builder.addCase(readIssues.fulfilled, (state, action) => {
      // state.issues = action.payload;
    });
  },
});

export const { setInvite } = issueSlice.actions;
export const issueReducer = issueSlice.reducer;
