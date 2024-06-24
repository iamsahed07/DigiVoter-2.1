import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface ElectionType {
  _id: any;
  electionName: string;
  startDate:string;
  endDate:string;
  areas:{}
}

interface ElectionState {
  elections: [ElectionType] | null;
  statesAndConsituency: {} | null;
  liveElectionId: string | null;
}

const initialState: ElectionState = {
  elections: null,
  statesAndConsituency:null,
  liveElectionId: null
};

const slice = createSlice({
  name: "election",
  initialState,
  reducers: {
    updateElections(
      ElectionState,
      { payload }: PayloadAction<[ElectionType] | null>
    ) {
      ElectionState.elections = payload;
    },
    updateStatesAndConsituency(
      ElectionState,
      { payload }: PayloadAction<{} | null>
    ) {
      ElectionState.statesAndConsituency = payload;
    },
    updateLiveElectionId(
      ElectionState,
      { payload }: PayloadAction<string | null>
    ) {
      ElectionState.liveElectionId = payload;
    },
  },
});

export const { updateElections, updateLiveElectionId, updateStatesAndConsituency } =
  slice.actions;

export const getElectionsState = createSelector(
  (state: RootState) => state,
  ({ elections }) => elections
);

export default slice.reducer;
