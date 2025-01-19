import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IContact, IInvite, IProfile } from "src/types/interfaces";
import {
  getContactsFromServer,
  getIssuesFromServer,
  readAgentFromServer,
  readProfileFromServer,
} from "src/server/glokiAPI";
import { RootState } from "src/Store";

export const startAgent = createAsyncThunk<IInvite, IInvite>(
  "gloki/startAgent",
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
  "gloki/readProfile",
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
  "gloki/getContacts",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server, contract } = state.gloki;
    if (agent && server && contract) {
      return (await getContactsFromServer(
        server,
        agent,
        contract
      )) as IContact[];
    }
    return Promise.reject();
  }
);

export const getIssues = createAsyncThunk<void, void>(
  "gloki/getIssues",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { agent, server, contract, contacts, isIssuesLoading } = state.gloki;
    if(!isIssuesLoading) {
      dispatch(clearIssues());

      if (agent && server && contract) {
        getIssuesFromServer(server, agent, contract).then((value) => {
          dispatch(addIssue(value));
        });
      }
      const promises = (contacts || []).map((contact) =>
        getIssuesFromServer(contact.server, contact.agent, contact.contract).then(
          (value) => {
            dispatch(addIssue(value)); // Dispatch for each result
          }
        )
      );

      // Wait for all promises to resolve
      await Promise.all(promises);
    }
    return Promise.resolve();
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
    contacts: undefined as IContact[] | undefined,
    issues: [] as string[],
    isIssuesLoading: false
  },
  reducers: {
    addIssue: (state, action) => {
      state.issues.push(...action.payload);
    },
    clearIssues: (state) => {
      state.issues = [];
      state.isIssuesLoading = true;
    },
  },
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
      })
      .addCase(getIssues.fulfilled, (state) => {
        state.isIssuesLoading = false;
      })
      .addCase(getIssues.rejected, (state) => {
        state.isIssuesLoading = false;
      });
  },
});

export const { addIssue, clearIssues } = glokiSlice.actions;
export default glokiSlice.reducer;
