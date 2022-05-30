import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const getUserDetails = createAsyncThunk(
  'user/user-auth',
    async (thunkAPI, { rejectWithValue }) => {
  
        const res = await fetch('/user-auth')

        let rjson = await res.json()
        

      //if the response was not succesful call the rejected action
      if (!res.ok) {

        return rejectWithValue(res)
      }
      else {
        return rjson
      } 

  }

);

export const getUsersTable = createAsyncThunk(
  'user/get-users-table',
async (request, { rejectWithValue }) => {

  const response = await fetch('/get-users-table', {
    headers: { 'Content-Type': 'application/json' },
    method: "POST",
    body: JSON.stringify(request)
  })

  console.log(response)
  console.log(response.ok)

  let res = await response.json()
  

  //if the response was not successful call the rejected action
  if (!response.ok) {
    return rejectWithValue(res)
  }
  else {
    return res
  }

});

//fetch the users table to add user data
export const setUsersTable = createAsyncThunk(
  'user/set-users-table',
async (request, { rejectWithValue }) => {

  const response = await fetch('/set-users-table', {
    headers: { 'Content-Type': 'application/json' },
    method: "POST",
    body: JSON.stringify(request)
  })

  console.log(response)
  console.log(response.ok)

  let res = await response.json()
  

  //if the response was not successful call the rejected action
  if (!response.ok) {
    return rejectWithValue(res)
  }
  else {
    return request
  }

});

//logout a user
export const logout = createAsyncThunk(
  'user/logout', async (request, { rejectWithValue }) => {
    
    //fetch the logout endpoint
    const response = await fetch('/logout')

    console.log(response)

    let res = await response.json()

    //if the response was not succesful call the rejected action
    if(!response.ok){
      
      return rejectWithValue(res)
    }
    else{       
      return null
    } 


  }
)

//sign up a new user
export const signUp = createAsyncThunk(
  'user/sign-up',
    async (request, { rejectWithValue }) => {
        

        //fetch the sign-up endpoint
        const response = await fetch('/sign-up', {
          headers: { 'Content-Type': 'application/json' },
          method: "POST",
          body: JSON.stringify(request)
        })
        
        console.log(response)
        console.log(response.ok)

        let res = await response.json()
        console.log('find res', res)
        //if the response was not succesfull call the rejected action
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
  original: null,
  saved: null,
  userCredentials: {
    email: '',
    password: '',
    first: '',
    last: ''
  },
  userErrors: null,
  isUserLoading: true,
  isUserTableLoading: true,
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
      
      state.user = action.payload
      state.isAuthenticated = true

       console.log('state when userDetails is fulfilled')
      console.log(current(state)) 
    })
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = false
      state.userErrors = action.error
      state.error = action.error
      state.isAuthenticated = false

      console.log('state when userDetails is rejected')
       console.log(current(state))
    })

    // SignUp reducers

    //pending
    builder.addCase(signUp.pending, (state, action) => {
      state.isUserLoading = true
      state.isAuthenticated = false
      //state.isUserTableLoading = true

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


      //**logout reducers**

       //pending
       builder.addCase(logout.pending, (state, action) => {
        state.isUserLoading = true

        console.log('state when logout is pending')
        console.log(current(state))
      })

    //fulfilled
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isUserLoading = false
      state.isAuthenticated = false

      //update the user
      state.user = action.payload
      
      //clear the user credentials
      state.userCredentials.email = ''
      state.userCredentials.first = ''
      state.userCredentials.last = ''
      state.userCredentials.password = ''

      //when fulfilled clear the userErrors field
      state.userErrors = null

      console.log('state when logout is fulfilled')
      console.log(current(state))
    })

    //rejected.
    builder.addCase(logout.rejected, (state, action) => {
      state.isUserLoading = false
      state.isAuthenticated = true

      //assign the errors
      state.userErrors = action.payload
      state.error = action.payload

      console.log('state when logout is rejected:')
      console.log(current(state))
    })

    //getUsersTable reducers

    //pending
    builder.addCase(getUsersTable.pending, (state, action) => {
      state.isUserTableLoading = true

      console.log('state when getUsersTable is pending')
      console.log(current(state))
    })

    //fulfilled
    builder.addCase(getUsersTable.fulfilled, (state, action) => {
      state.isUserTableLoading = false

      //assign the saved and original to the state
      state.saved = action.payload.saved_recipes
      state.original = action.payload.original_posts

      //when fulfilled clear the errors field
      state.error = null

      console.log('state when getUsersTable is fulfilled')
      console.log(current(state))
    })

    //rejected
    builder.addCase(getUsersTable.rejected, (state, action) => {
      state.isUserTableLoading = false

      state.error = action.payload

      console.log('state when getUsersTable is rejected:')
      console.log(current(state))
    })


        //setUsersTable reducers

    //pending
    builder.addCase(setUsersTable.pending, (state, action) => {
      state.isUserTableLoading = true

      console.log('state when setUsersTable is pending')
      console.log(current(state))
    })

    //fulfilled
    builder.addCase(setUsersTable.fulfilled, (state, action) => {
      state.isUserTableLoading = false
      if (action.payload.action != 'remove'){
          state.saved.push(action.payload.meal_id)
      }
      else{
        let index = state.saved.indexOf(action.payload.meal_id)
        state.saved.splice(index, 1)
      }

      
      //when fulfilled clear the errors field
      state.error = null

      console.log('state when setUsersTable is fulfilled')
      console.log(current(state))
    })

    //rejected
    builder.addCase(setUsersTable.rejected, (state, action) => {
      state.isUserTableLoading = false

      state.error = action.payload

      console.log('state when setUsersTable is rejected:')
      console.log(current(state))
    })
  }
})

const selectUserSaved = state => state.user.saved
const selectUserOriginal = state => state.user.original
const selectUser = state => state.user.user
const selectUserLoading = state => state.user.isUserLoading
const selectUserTableLoading = state => state.user.isUserTableLoading
const selectUserCredentials = state => state.user.userCredentials
const selectUserAuth = state => state.user.isAuthenticated

//selector
export const selectUserInfo = createSelector([selectUser, selectUserLoading, selectUserCredentials, selectUserAuth, selectUserSaved, selectUserOriginal, selectUserTableLoading], (user, isUserLoading, userCredentials, isAuthenticated, saved, original, isUserTableLoading) => {
  return {
    user,
    isUserLoading,
    userCredentials,
    isAuthenticated,
    saved,
    original,
    isUserTableLoading
  }
})

// Export the action to be used by the components in the application
export const { setEmail, setPassword, setFirst, setLast } = userSlice.actions


//Export the reducer to be assigned in the global store
export default userSlice.reducer