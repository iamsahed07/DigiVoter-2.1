import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface ElectionType {
  _id: any;
  electionName: string;
  status: string;
  candidateAsConstituency: [string];
}

interface ElectionState {
  elections: [ElectionType] | null;
  liveElectionId: string | null;
}

const initialState: ElectionState = {
  elections: null,
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
    updateLiveElectionId(
        ElectionState,
        {payload}: PayloadAction<string|null>
    ){
        ElectionState.liveElectionId = payload
    }
  },
});

export const { updateElections,updateLiveElectionId } = slice.actions;

export const getElectionsState = createSelector(
  (state: RootState) => state,
  ({ elections }) => elections
);

export default slice.reducer;
