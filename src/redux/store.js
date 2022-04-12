import { configureStore } from '@reduxjs/toolkit'
import credentialReducer from "./credentials" //import the reducer

//call configureStore and pass in an object, the object has one key: reducer. All reducers created will be add here in order to be available all components in teh application.
//the reducers parameter, tells the store to use this slice reducer function to handle all updates to that state
export default configureStore({
  reducer: {
      credential: credentialReducer
  }
})