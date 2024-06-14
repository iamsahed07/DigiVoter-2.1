import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface CandidateProfile {
  _id: any;
  name: string;
  email: string;
  verified: boolean;
  adhar: string;
  role: string;
  dob: string;
  voterId: string;
  mobile: string;
  address: string;
  party: string;
  age: number;
  constituency: string;
  state: string;
  imageurl: string;
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
