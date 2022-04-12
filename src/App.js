import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './components/Login'
import FoodPost from './components/FoodPost';
import Home from './components/Home';
import "./App.css";

function App() {




  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="FoodPost" element={<FoodPost />}></Route>
        <Route path="Home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;