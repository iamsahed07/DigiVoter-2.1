import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import { RootState } from '.';

export interface UserProfile {
  id: any;
  name: string;
  email: string;
  verified: boolean;
  adhar: string;
  role: string;
  dob: string;
  voterId: string;
  mobile: string;
  address: string;
  age: number;
  constituency: string;
  state: string;
  imgUrl: string | null;
  gender: string;
}

export interface AdminProfile{
  username:string;
  email:string;
}

interface AuthState {
  profile: UserProfile | null;
  profiles: [UserProfile] | null;
  adminProfile: AdminProfile|null;
  loggedIn: boolean;
  busy:boolean;
  isVoterIdVerified:boolean;
};

const initialState: AuthState = {
  profile: null,
  profiles:null,
  adminProfile:null,
  loggedIn: false,
  busy:false,
  isVoterIdVerified:false
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile(authState, {payload}: PayloadAction<UserProfile | null>) {
      authState.profile = payload;
    },
    
    updateProfiles(authState, {payload}: PayloadAction<[UserProfile] | null>) {
      authState.profiles = payload;
    },
    updateAdminProfile(authState, {payload}: PayloadAction<AdminProfile | null>) {
      authState.adminProfile = payload;
    },
    updateLoggedInState(authState, {payload}) {
        authState.loggedIn = payload
    },
    updateBusyState(authState, {payload}:PayloadAction<boolean>) {
        authState.busy = payload
    },
    updateVoterIdVerified(authState,{payload}: PayloadAction<boolean>){
      authState.isVoterIdVerified = payload;
    }
  },
});

export const {
  updateLoggedInState,
  updateProfile,
  updateAdminProfile,
  updateBusyState,
  updateProfiles,
  updateVoterIdVerified
} = slice.actions;

export const getAuthState = createSelector(
  (state:RootState)=>state,
  ({auth})=> auth
)

export default slice.reducer;
