import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IContact, IInvite, IProfile } from "src/types/interfaces";
import {
  getContactsFromServer,
  readAgentFromServer,
  readProfileFromServer,
} from "src/server/glokiAPI";
import { RootState } from "src/Store";

export const startAgent = createAsyncThunk<IInvite, IInvite>(
  "agent/startAgent",
  async (credentials) => {
    const { server, agent } = credentials;
    if (agent && server) {
      const reply = {
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
    const { agent, server, contract } = state.gloki;
    if (agent && server && contract) {
      return (await readProfileFromServer(server, agent, contract)) as IProfile;
    }
    return Promise.reject();
  }
);

export const getContacts = createAsyncThunk<IContact[], void>(
  "agent/getContacts",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server, contract } = state.gloki;
    if (agent && server && contract) {
      return (await getContactsFromServer(server, agent, contract)) as IContact[];
    }
    return Promise.reject();
  }
);

const glokiSlice = createSlice({
  name: "gloki",
  initialState: {
    serverError: false,
    agent: undefined as string | undefined,
    server: undefined as string | undefined,
    contract: undefined as string | undefined,
    profile: undefined as IProfile | undefined,
    contacts: undefined as IContact[] | undefined
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
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state) => {
        state.serverError = true;
      });
  },
});

export default glokiSlice.reducer;
