import React, { useEffect, useState } from 'react'
import Recipes from './layout/Recipes'
import Header from './layout/Header';

import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes, selectPostsInfo } from '../redux/postSlice';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navbar } from 'react-bootstrap';
import NavComponent from './layout/NavComponent';
import{ useNavigate, Link } from 'react-router-dom'

function Home() {


    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        //runs once after initial mounting
        fetch('/Home')
            .then((res) => res.json())
            .then((data) => { setRecipes(data); console.log(data) });
    }, []);

    //A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
   // const {user} = useSelector(selectUserInfo)

    return (
        <>
            <Header />

            <div className='homeBG'>
                {recipes && recipes.map((doc) =>
                    <Recipes doc={doc} />
                )}
            </div>



        </>
    )
}



export default (Home)