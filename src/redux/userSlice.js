import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

//Define state, reducers, and actions with createSlice() using redux toolkit. Instead of defining them sepreately with redux
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    /*fname: "",
    lname: "",
    email: "",
    pwd: "",*/
  },
  reducers: {
      //actions
      //action parameter allows you to pass in a variable, and assign a payload to be assigned as the new value
      login: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
      /*
    setFName: (state, action) => {
      state.fname = action.payload
      
    },
    setLName: (state, action) => {
        state.lname = action.payload
      },
    setEmail: (state, action) => {
        state.email = action.payload
      },
      setPwd: (state, action) => {
        state.pwd = action.payload
      }*/
  }
})

const userState = state => state.user



//selector
export const userInfo = createSelector( [userState], ({user}) => {
  return {
    user
  }
})
/*
// selector
export const userInfo = createSelector( [userState], ({fname, lname, email, pwd}) => {
  return {
    fname, lname, email, pwd
  }
})
*/

// Export the action to be used by the components in the application
export const { login, logout } = userSlice.actions

//export const { setFName, setLName, setEmail, setPwd } = userSlice.actions

//Export the reducer to be assigned in the global store
export default userSlice.reducer