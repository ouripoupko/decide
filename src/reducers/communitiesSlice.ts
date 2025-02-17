import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IContract } from "src/types/interfaces";
import { RootState } from "src/Store";
import { readCommunitiesFromServer } from "src/server/communityAPI";

export const readCommunities = createAsyncThunk<IContract[], void>(
  "communities/readCommunities",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server } = state.gloki;
    if (agent && server) {
      return (await readCommunitiesFromServer(server, agent)) as IContract[];
    }
    return Promise.reject();
  }
);

const communitiesSlice = createSlice({
  name: "communities",
  initialState: {
    contracts: [] as IContract[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readCommunities.fulfilled, (state, action) => {
      state.contracts = action.payload;
    });
  },
});

export default communitiesSlice.reducer;
