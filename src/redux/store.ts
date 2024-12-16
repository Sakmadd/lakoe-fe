import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter';
import loggedUserReducer from './features/logged-user-slice';
import isPreloadedReducer from './features/is-preloaded-slice';

const store = configureStore({
  reducer: {
    isPreloaded: isPreloadedReducer,
    loggedUser: loggedUserReducer,
    counter: counterReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
