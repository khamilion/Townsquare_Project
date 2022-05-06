import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const getAllRecipes = createAsyncThunk(
    'posts/getAllRecipes',
      async (thunkAPI) => {
        try {
          const res = await fetch('/all-recipes').then(
            (data) => data.json()
          )
          return res
        } catch(err) {
            console.log(err)
          return "none"
        }
    }

);

export const getRecipe = createAsyncThunk(
  'posts/getRecipe',
  async (request, { rejectWithValue }) => {
    console.log(`sign up thunk: ${JSON.stringify(request)}`);

    //fetch the getRecipe endpoint
    const response = await fetch('/getRecipe', {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(request)
    })
    
    console.log(response)
    console.log(response.ok)

    let res = await response.json()

    //if the response was not succesfull call the rejected action
    if(!response.ok){
      return rejectWithValue(res)
    }
    else{       
      return res
    } 
}

);

export const addPost = createAsyncThunk(
  'posts/addPosts',
    async (request) => {
      try {
        console.log(request);
        const res = await fetch('/create-post', {
          'headers': {
            'Accept': 'application/json'
          },
          method: "Post",
          body: JSON.stringify(request)
        }).then(
          (data) => data.json()
        )
        return res
      } catch(err) {
        return 'There was an error processing the request.'
      }
  }

);
    


const initialState = {
  posts: null,
  isLoading: true,
  error: null
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addNewPost: (state, action) => {
        console.log(current(state))
        console.log(action.payload);
    }
  },
  extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getAllRecipes.pending, (state, action) => {
          state.isLoading = true

           console.log('state when getAllRecipes is pending')
          console.log(current(state)) 
        })

        builder.addCase(getAllRecipes.fulfilled, (state, action) => {
          state.isLoading = false
          state.posts = action.payload

           console.log('state when getAllRecipes is fulfilled')
          console.log(current(state)) 
        })

        builder.addCase(getAllRecipes.rejected, (state, action) => {
          state.isLoading = false
          state.error = action.payload

           console.log('state when getAllRecipes is rejected')
          console.log(current(state)) 
        })

        builder.addCase(addPost.rejected, (state, action) => {
          state.isLoading = false
          state.error = action.payload

         /*  console.log('state when addPost is rejected')
          console.log(current(state)) */
        })

    //getRecipe reducers

    //pending
    builder.addCase(getRecipe.pending, (state, action) => {
      state.isLoading = true

      console.log('state when getRecipe is pending')
      console.log(current(state))
    })

    //fulfilled
    builder.addCase(getRecipe.fulfilled, (state, action) => {
      state.isLoading = false

      //assign the post state
      state.posts = action.payload

      //when fulfilled clear the errors field
      state.error = null
      
       console.log('state when getRecipe is fulfilled')
      console.log(current(state))
    })

    //rejected
    builder.addCase(getRecipe.rejected, (state, action) => {
      state.isLoading = false

      state.error = action.payload

      console.log('state when getRecipe is rejected:')
       console.log(current(state)) 
    })
   }
})

// Action creators are generated for each case reducer function
export const { addNewPost } = postSlice.actions

export default postSlice.reducer

 const selectPosts = state => state.posts.posts
 const selectLoading = state => state.posts.isLoading

export const selectPostsInfo = createSelector([selectPosts, selectLoading], (posts, isLoading) => {
    return {
      posts,
      isLoading
    }
})

