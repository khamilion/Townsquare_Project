import React from 'react'
import { useEffect } from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { userInfo, getUserDetails } from '../redux/userSlice'
import { getAllRecipes, selectPostsInfo } from '../redux/postSlice'
import{ useNavigate } from 'react-router-dom'

import Header from './layout/Header'
import Recipes from './layout/Recipes'
import BounceLoader from "react-spinners/BounceLoader";


function AllRecipes() {
  const { posts, isLoading } = useSelector(selectPostsInfo);


  //set up the dispatch hook in order to call any action from any reducer
  const dispatch = useDispatch()

  useEffect(() => {
    //console.log('use Effect Called on initial render');

    //Dispatch the action to get all recipes from database
    dispatch(getAllRecipes());
    
  },[]);

  // display the recipes if isloading is false and posts is true
  if (!isLoading && posts) {
    return (
      <>
        <Header />

        <div className='homeBG'>
          {posts && posts.map((doc) =>
            <Recipes doc={doc} />
          )}
        </div>
      </>
    )
  }
  else{
  return (    
    <>
      <Header />
      
      <div className="container container h-100 center-page">
        <div className="row h-100 justify-content-center align-items-center">
          <BounceLoader />
        </div>
      </div>
    </>
      )
  }
}

export default AllRecipes
