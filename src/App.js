import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { getAllRecipes,selectPostsInfo } from './redux/postSlice'
import { selectUserInfo, getUsersTable} from './redux/userSlice'

import Login from './components/auth/Login'
import AllRecipes from './components/AllRecipes';
import Home from './components/Home';
import "./App.css";
import SignUp from "./components/auth/SignUp";
import Breakfast from "./components/Breakfast";
import Lunch from "./components/Lunch";
import Dinner from "./components/Dinner";
import Recipe from "./components/Recipe";
import Profile from "./components/Profile";

function App() {

    //set up the dispatch hook in order to call any action from any reducer
    const dispatch = useDispatch()
    const { posts } = useSelector(selectPostsInfo)
    const {isUserTableLoading, saved, original, user } = useSelector(selectUserInfo)

  useEffect(() => {
    //console.log('use Effect Called on initial render');
    if (posts == null) {
      //Dispatch the action to get all recipes from database
      dispatch(getAllRecipes())

        //dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error
        .unwrap()
        .catch((error) => {
          // handle error here
          alert("Please try again: " + error)
        })
    }
 

  },[posts]);

  useEffect(() => {
    //console.log('use Effect Called on initial render');
    if (user != null && saved == null) {
      console.log('useEffect 2:', user)
      //Dispatch the action to get all recipes from database
      dispatch(getUsersTable({"user_id": user.uid}))

        //dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error
        .unwrap()
        .catch((error) => {
          // handle error here
          alert("Please try again: " + error)
        })
    }
  },[user, saved, original]);


  return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="sign-up" element={<SignUp />}></Route>

        <Route path="all-recipes" element={<AllRecipes />}></Route>
        <Route path="all-recipes/:recipeID" element={<Recipe />}></Route>

        <Route path="home" element={<Home />}></Route>
        <Route path="home/:recipeID" element={<Recipe/>}></Route>

        <Route path="breakfast" element={<Breakfast/>}></Route>
        <Route path="breakfast/:recipeID" element={<Recipe/>}></Route>

        <Route path="lunch" element={<Lunch />}></Route>
        <Route path="lunch/:recipeID" element={<Recipe/>}></Route>
        
        <Route path="dinner" element={<Dinner />}></Route>
        <Route path="dinner/:recipeID" element={<Recipe/>}></Route>

        <Route path="profile" element={<Profile />}></Route>
        <Route path="profile/:recipeID" element={<Recipe/>}></Route>
      </Routes>
  );
}

export default App;