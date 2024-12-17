import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IInvite, IProfile } from "src/types/interfaces";
import { readAgentFromServer, readProfileFromServer } from "src/server/gloki";
import { RootState } from "src/Store";

export const startAgent = createAsyncThunk<IInvite, IInvite>(
  "agent/startAgent",
  async (credentials) => {
    const { server, agent } = credentials;
    if (agent && server) {
      const reply =  {
        server,
        agent,
        contract: (await readAgentFromServer(server, agent)) as string,
      } as IInvite;
      return reply;
    }
    return Promise.reject();
  }
);

export const readProfile = createAsyncThunk<IProfile, void>(
  "agent/readProfile",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server, contract } = state.agent;
    console.log("read profile contract", contract);
    if (agent && server && contract) {
      return (await readProfileFromServer(server, agent, contract)) as IProfile;
    }
    return Promise.reject();
  }
);

const agentSlice = createSlice({
  name: "agent",
  initialState: {
    serverError: false,
    agent: undefined as string | undefined,
    server: undefined as string | undefined,
    contract: undefined as string | undefined,
    profile: undefined as IProfile | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startAgent.fulfilled, (state, action) => {
        state.agent = action.payload.agent;
        state.server = action.payload.server;
        state.contract = action.payload.contract;
      })
      .addCase(startAgent.rejected, (state) => {
        state.serverError = true;
      })
      .addCase(readProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(readProfile.rejected, (state) => {
        state.serverError = true;
      });
  },
});

export default agentSlice.reducer;
