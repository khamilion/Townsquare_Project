import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const getUserDetails = createAsyncThunk(
  'user/get-auth',
    async (thunkAPI) => {
      try {
        const res = await fetch('/user-authenticated').then(
          (data) => data.json()
        )
        return res
      } catch(err) {
        return 'There was an error processing the request.'
      }
  }

);

//sign up a new user
export const signUp = createAsyncThunk(
  'user/sign-up',
    async (request) => {
        console.log(`sign up thunk: ${JSON.stringify(request)}`);

        //Call the sign-up endpoint
        const response = await fetch('/sign-up', {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(request)
        })
        let res = await response.json()
        console.log(res)
        return res
        /*
        .then((data) =>  { const user_data = data.json()
                            console.log(user_data) 
                            return user_data}) */
  }

);


export const login = createAsyncThunk(
  'user/login',
    async (request) => {
      try {
        console.log(request);
        const res = await fetch('/login', {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(request)
        }).then(
          (data) =>  {
            console.log(data.json())
            return data.json()
          }
        )
      } catch(err) {
        return 'There was an error processing the request.'
      }
  }

);

//Initial state
const initialState = {
  user: null,
  userCredentials: {
    email: '',
    password: '',
    first: '',
    last: ''
  },
  userErrors: null,
  isUserLoading: true,
  isAuthenticated: false,
}

//Define state, reducers, and actions with createSlice() using redux toolkit. Instead of defining them sepreately with redux
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //actions
    //action parameter allows you to pass in a variable, and assign a payload to be assigned as the new value
    setEmail: (state, action) => {
      state.userCredentials.email = action.payload
    },
    setPassword: (state, action) => {
      state.userCredentials.password = action.payload
    },
    setFirst: (state, action) => {
      state.userCredentials.first = action.payload
    },
    setLast: (state, action) => {
      state.userCredentials.last = action.payload
    }

  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.isUserLoading = true
      /* console.log('state when getPosts is pending')
      console.log(current(state)) */
    })
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.isUserLoading = false
      console.log(action.payload)
      state.user = action.payload
      /* console.log('state when getPosts is fulfilled')
      console.log(current(state)) */
    })
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = false
      state.userErrors = action.error
      state.error = action.error
      console.log('state when getPosts is rejected')
       console.log(current(state))
    })

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signUp.pending, (state, action) => {
      state.isUserLoading = true
       console.log('state when sign-up is pending')
      console.log(current(state))
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isUserLoading = false
      console.log(`fulfilled: ${action.payload}`)
      state.user = action.payload
      
       console.log('state when getPosts is fulfilled')
      console.log(current(state))
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false
      state.userErrors = action.error
      state.error = action.error

      console.log('state when sign-up is rejected:')
       console.log(current(state)) 
    })
  }
})

const selectUser = state => state.user.user
const selectUserLoading = state => state.user.isUserLoading
const selectUserCredentials = state => state.user.userCredentials

//selector
export const selectUserInfo = createSelector([selectUser, selectUserLoading, selectUserCredentials], (user, isUserLoading, userCredentials) => {
  return {
    user,
    isUserLoading,
    userCredentials
  }
})

// Export the action to be used by the components in the application
export const { setEmail, setPassword, setFirst, setLast } = userSlice.actions

/*
// selector
export const userInfo = createSelector( [userState], ({fname, lname, email, pwd}) => {
  return {
    fname, lname, email, pwd
  }
})
*/

//export const { setFName, setLName, setEmail, setPwd } = userSlice.actions

//Export the reducer to be assigned in the global store
export default userSlice.reducer