import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const getUserDetails = createAsyncThunk(
  'user/user-auth',
    async (thunkAPI) => {
      try {
        const res = await fetch('/user-auth').then(
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
    async (request, { rejectWithValue }) => {
        console.log(`sign up thunk: ${JSON.stringify(request)}`);

        //fetch the sign-up endpoint
        const response = await fetch('/sign-up', {
          headers: { 'Content-Type': 'application/json' },
          method: "POST",
          body: JSON.stringify(request)
        })
        
        console.log(response)
        console.log(response.ok)

        let res = await response.json()

        if(!response.ok){
          return rejectWithValue(res)
        }
        else{       
          return res
        } 
  }

);

//login in a recurring user
export const login = createAsyncThunk(
  'user/login',
    async (request, { rejectWithValue }) => {
        console.log(`login up thunk: ${JSON.stringify(request)}`);

        //fetch the login endpoint
        const response = await fetch('/login', {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(request)
        })

        console.log(response)
        console.log(response.ok)

        let res = await response.json()

        //if the response was not succesfull call the rejected action
        if(!response.ok){
          // Use `res` as `action.payload` for a `rejected` action, by explicitly returning it using the `rejectWithValue()` utility
          return rejectWithValue(res)
        }
        else{
          return res
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

    // SignUp reducers

    //pending
    builder.addCase(signUp.pending, (state, action) => {
      state.isUserLoading = true
      state.isAuthenticated = false

      console.log('state when sign-up is pending')
      console.log(current(state))
    })

    //fulfilled
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isUserLoading = false
      state.isAuthenticated = true

      //assign the user state
      state.user = action.payload

      //when fulfilled clear the userErrors field
      state.userErrors = null
      
       console.log('state when getPosts is fulfilled')
      console.log(current(state))
    })

    //rejected
    builder.addCase(signUp.rejected, (state, action) => {
      state.isUserLoading = false
      state.isAuthenticated = false

      state.userErrors = action.payload
      state.error = action.payload

      console.log('state when sign-up is rejected:')
       console.log(current(state)) 
    })

       //**login reducers**

       //pending
       builder.addCase(login.pending, (state, action) => {
        state.isUserLoading = true
        state.isAuthenticated = false

         console.log('state when login is pending')
        console.log(current(state))
      })

      //fulfilled
      builder.addCase(login.fulfilled, (state, action) => {
        state.isUserLoading = false
        state.isAuthenticated = true

        state.user = action.payload

        //when fulfilled clear the userErrors field
        state.userErrors = null
        
         console.log('state when login is fulfilled')
        console.log(current(state))
      })
      //rejected.
      builder.addCase(login.rejected, (state, action) => {
        state.isUserLoading = false
        state.isAuthenticated = false

        state.userErrors = action.payload
        state.error = action.payload
  
        console.log('state when login is rejected:')
         console.log(current(state)) 
      })


  }
})

const selectUser = state => state.user.user
const selectUserLoading = state => state.user.isUserLoading
const selectUserCredentials = state => state.user.userCredentials
const selectUserAuth = state => state.user.isAuthenticated

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


//Export the reducer to be assigned in the global store
export default userSlice.reducer