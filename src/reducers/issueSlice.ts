import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { readIssueFromServer } from "src/server/issueApi";
import { RootState } from "src/Store";
import { IIssueContent } from "src/types/interfaces";


export const addComment = createAsyncThunk<any, any>(
  "issue/addComment",
  async (something) => {
    console.log(something)
  }
);

export const addProposal = createAsyncThunk<any, any>(
  "issue/addProposal",
  async (something) => {
    console.log('addProposal', something)
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

export const readIssue = createAsyncThunk<IIssueContent, void>(
  "issue/readIssue",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server } = state.gloki;
    const { contract } = state.issue;
    if (agent && server && contract) {
      return await readIssueFromServer(server, agent, contract) as IIssueContent;
    }
    return Promise.reject();
  }
);

const issueSlice = createSlice({
  name: "issue",
  initialState: {
    contract: undefined as string | undefined,
    description: "",
    proposals: [] as string[], 
    votes: {} as {[agent: string]: number},
  },
  reducers: {
    setIssueContract: (state, action) => {
      state.contract = action.payload;
    },
    setInvite: (state, action) => {
      // state.invite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readIssue.fulfilled, (state, action) => {
      state.description = action.payload.description;
      state.proposals = action.payload.proposals;
      state.votes = action.payload.votes;
    });
  },
});

export const { setIssueContract, setInvite } = issueSlice.actions;
export const issueReducer = issueSlice.reducer;
