import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface CandidateProfile {
  _id: any;
  candidateName: string;
  electionName: string;
  party: string;
  state: string;
  constituency: string;
  adhar: string;
  dob: string;
  imgUrl: string;
}

interface CandidateState {
  candidateAsConstituencyId: string | null;
  profiles: [CandidateProfile] | null;
  constituency: string | null;
}

const initialState: CandidateState = {
  candidateAsConstituencyId: null,
  profiles: null,
  constituency: null,
};

const slice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    updateCandidateProfile(
      CandidateState,
      { payload }: PayloadAction<[CandidateProfile] | null>
    ) {
      CandidateState.profiles = payload;
    },
    updateCandidateAsConstituencyId(
      CandidateState,
      { payload }: PayloadAction<string | null>
    ) {
      CandidateState.candidateAsConstituencyId = payload;
    },
  },
});

export const { updateCandidateProfile, updateCandidateAsConstituencyId } =
  slice.actions;

export const getCandidateState = createSelector(
  (state: RootState) => state,
  ({ candidate }) => candidate
);

export default slice.reducer;
