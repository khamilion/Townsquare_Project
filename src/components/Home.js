import React, { useEffect, useState } from 'react'
import Recipes from './Recipes'
import { useDispatch, useSelector } from 'react-redux'
import { userInfo } from '../redux/userSlice';



function Home() {
     

        const [recipes, setRecipes] = useState(null);

        useEffect(() => {
            //runs once after initial mounting
            fetch('/Home')
            .then((res) => res.json())
            .then((data) => {setRecipes(data); console.log(data)});
        }, []);
        
        //A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
        //const {fname, lname, email, pwd} = useSelector(userInfo)

  return (
      <>
        <div className='container-fluid'>
            <header>
                <h1>Foodi</h1>
            </header>

                   
        <div>        
            {recipes && recipes.map((doc) => 
                <Recipes doc={doc} />
            )}
        </div>    

        </div>

      </>
  )
}



export default (Home)