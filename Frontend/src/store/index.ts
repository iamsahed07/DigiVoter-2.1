import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import notificationReducer from './notification'
import candidateReducer from './candidate'
import electionReducer from './election'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key:'root',
    version:1,
    storage
}

const reducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  candidate: candidateReducer,
  elections:electionReducer
});

const persistedReducer = persistReducer(persistConfig,reducer)
const store = configureStore({
    reducer: persistedReducer
})

export type RootState = ReturnType<typeof store.getState>

export default store;