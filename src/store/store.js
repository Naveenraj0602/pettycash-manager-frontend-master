import { configureStore,combineReducers } from "@reduxjs/toolkit";

import profileReducer from "./reducers/profile";
import backdropReducer from "./reducers/backdrop";

//MIDDLEWARE
const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage.setItem('applicationState', JSON.stringify(getState()));
    return result;
  };
};

//rehydrate store to preload the data
const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
  }
};

//Combined reducers & dispatch the action for logout
const combinedReducer = combineReducers({
  profileReducer,
    backdropReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') { // check for action type 
    state = undefined;
  }
  return combinedReducer(state, action);
};

//store configuration
const store = configureStore({
  reducer: rootReducer,
  devTools: false, // should false for PROD deployment
  preloadedState: reHydrateStore(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});


store.subscribe(() => console.log('Successfully Subscribed with Initial State', store.getState()))

export default store;