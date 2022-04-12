import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

//Define state, reducers, and actions with createSlice() using redux toolkit. Instead of defining them sepreately with redux
export const credentialSlice = createSlice({
  name: 'credential',
  initialState: {
    fname: "",
    lname: "",
    email: "",
    pwd: "",
    title: "",
    content: ""
  },
  reducers: {
      //actions
      //action parameter allows you to pass in a variable, and assign a payload to be assigned as the new value
    setFName: (state, action) => {
      state.fname = action.payload
      
    },
    setLName: (state, action) => {
        state.lname = action.payload
      },
    setEmail: (state, action) => {
        state.email = action.payload
      },
      setTitle: (state, action) => {
        state.title = action.payload
      },
      setContent: (state, action) => {
        state.content = action.payload
      },
      setPwd: (state, action) => {
        state.pwd = action.payload
      }
  }
})

const selectPosts = state => state.credential

export const selectPostsInfo = createSelector([selectPosts], ({fname, lname, email, title, content, pwd}) => {
  return {
    fname, lname, email, title, content,pwd
  }
})
// Export the action to be used by the components in the application
export const { setFName, setLName, setEmail, setTitle, setContent, setPwd } = credentialSlice.actions

//Export the reducer to be assigned in the global store
export default credentialSlice.reducer