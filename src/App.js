import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './components/auth/Login'
import AllRecipes from './components/AllRecipes';
import Home from './components/Home';
import "./App.css";
import SignUp from "./components/auth/SignUp";
import Breakfast from "./components/Breakfast";
import Lunch from "./components/Lunch";
import Dinner from "./components/Dinner";
import Recipe from "./components/Recipe";

function App() {




  return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="sign-up" element={<SignUp />}></Route>

        <Route path="all-recipes" element={<AllRecipes />}></Route>
        <Route path="all-recipes/:meal/:recipeID" element={<Recipe />}></Route>

        <Route path="home" element={<Home />}></Route>

        <Route path="breakfast" element={<Breakfast/>}></Route>
        <Route path="breakfast/:meal/:recipeID" element={<Recipe/>}></Route>

        <Route path="lunch" element={<Lunch />}></Route>
        <Route path="lunch/:meal/:recipeID" element={<Recipe/>}></Route>
        
        <Route path="dinner" element={<Dinner />}></Route>
        <Route path="dinner/:meal/:recipeID" element={<Recipe/>}></Route>
      </Routes>
  );
}

export default App;