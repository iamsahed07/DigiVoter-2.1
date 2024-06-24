import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

type notificationType = 'error' | 'success'

interface Notification {
    message: string;
    type: notificationType;
}

const initialState : Notification = {
    message: '',
    type:'error' //by default 
}

const  slice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        updateNotification(notificationState,{payload}:PayloadAction<Notification>){
            notificationState.message = payload.message;
            notificationState.type = payload.type;
        }
    }
})

export const getNotificationState = createSelector(
  (state: RootState) => state.notification,
  notificationState => notificationState,

  //or //you can write below
//   (state: RootState) => state,
//   ({notification}) => notification,
);
export const {updateNotification} = slice.actions;
export default slice.reducer